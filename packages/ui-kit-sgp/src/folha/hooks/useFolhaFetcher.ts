// @ts-nocheck
// Wave H.6 (2026-05-15) — extraido de FolhaDeVerificacao.
// Encapsula fetch+enriquecimento da folha (deduplicacao + recalculo isLate).
// View-pure no que toca a Redux: o caller injeta `fetchFolha` (ex.: thin wrapper
// sobre useCoreService) e `onPersistFolha` (ex.: dispatch addFolhaDoCadernoView).
import { useCallback, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

export interface FolhaVM {
  id?: any
  cadernoDeVerificacaoId?: any
  fetched?: boolean
  registrosDeCampo: any[]
  [key: string]: any
}

export interface UseFolhaFetcherOptions {
  /** Folha "raw" recebida do caller (Redux/parent). Se ja `fetched`, nao refetch. */
  outFolha: FolhaVM | undefined
  /** Pagina ativa. */
  paginaAtual: any
  /** Caderno (precisa de `id` + `camposDeVerificacao`). */
  caderno: { id?: any; camposDeVerificacao?: any[] }
  /** IO injetada — caller controla controller/HTTP. */
  fetchFolha: (cadernoId: any, pagina: any) => Promise<FolhaVM>
  /** Persistencia opcional — chamada apos enriquecimento (ex.: dispatch para Redux). */
  onPersistFolha?: (folha: FolhaVM) => void
}

const enrichFolha = (folhaRaw: FolhaVM | undefined, camposDef: any[]): FolhaVM | undefined => {
  if (!folhaRaw || !folhaRaw.registrosDeCampo) return folhaRaw
  let registrosEnriched = folhaRaw.registrosDeCampo.map((reg) => {
    const campoId = reg.campoDeVerificacao?.id || reg.campoDeVerificacaoId || reg.campoDeVerificacao
    const def = camposDef.find((c) => String(c.id) === String(campoId))
    return {
      ...reg,
      _localId: reg._localId || uuid(),
      campoDeVerificacao: def || reg.campoDeVerificacao,
    }
  })
  // Dedup
  const seen = new Set<string>()
  registrosEnriched = registrosEnriched.filter((reg) => {
    const key = reg.id ? `id:${reg.id}` : `campo:${reg.campoDeVerificacaoId || reg.campoDeVerificacao?.id}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
  // Recompute isLate (skip changed)
  registrosEnriched.forEach((reg) => {
    if (reg.changed) return
    const control = reg.campoDeVerificacao?.controle
    const lastReg = reg.lastRegister
    if (control && control !== 'default' && control.valor) {
      let diff = 0
      let shouldCheck = false
      const now = new Date().getTime()
      if (reg.id && reg.data) {
        diff = now - new Date(reg.data).getTime()
        shouldCheck = true
      } else if (lastReg && lastReg.data) {
        diff = now - new Date(lastReg.data).getTime()
        shouldCheck = true
      }
      if (shouldCheck) {
        reg.isLate = diff > Number(control.valor)
      }
    }
  })
  return { ...folhaRaw, registrosDeCampo: registrosEnriched, fetched: true }
}

export interface UseFolhaFetcherApi {
  folha: FolhaVM | undefined
  setFolha: React.Dispatch<React.SetStateAction<FolhaVM | undefined>>
  loading: boolean
  refresh: (pagina: any) => Promise<void>
  /** Atualiza um registro especifico in-place. */
  atualizarRegistro: (payload: any) => void
}

export function useFolhaFetcher({
  outFolha,
  paginaAtual,
  caderno,
  fetchFolha,
  onPersistFolha,
}: UseFolhaFetcherOptions): UseFolhaFetcherApi {
  const [folha, setFolha] = useState<FolhaVM | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  const enrich = useCallback((raw?: FolhaVM) => enrichFolha(raw, caderno.camposDeVerificacao || []), [caderno.camposDeVerificacao])

  const doFetch = useCallback(
    async (pagina: any) => {
      try {
        setLoading(true)
        const fetched = await fetchFolha(outFolha?.cadernoDeVerificacaoId || caderno.id, pagina)
        const processed = enrich(fetched)!
        onPersistFolha?.(processed)
        setFolha(processed)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Erro ao buscar folha de verificacao:', err)
      } finally {
        setLoading(false)
      }
    },
    [fetchFolha, outFolha?.cadernoDeVerificacaoId, caderno.id, enrich, onPersistFolha],
  )

  useEffect(() => {
    if (outFolha?.id && !outFolha?.fetched && paginaAtual) {
      doFetch(paginaAtual)
    } else if (outFolha) {
      setLoading(false)
      setFolha(enrich(outFolha))
    }
  }, [outFolha, paginaAtual, enrich, doFetch])

  const atualizarRegistro = useCallback((payload: any) => {
    setFolha((folhaAnterior) => {
      if (!folhaAnterior) return folhaAnterior
      return {
        ...folhaAnterior,
        registrosDeCampo: folhaAnterior.registrosDeCampo.map((registro) =>
          registro.id === payload.id ? { ...registro, ...payload } : registro,
        ),
      }
    })
  }, [])

  return { folha, setFolha, loading, refresh: doFetch, atualizarRegistro }
}
