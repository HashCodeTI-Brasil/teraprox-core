// Promovido de teraprox-SGP-caderno hook useRegistroDeCampoCard (subset getStyle).
// Wave H.4 (2026-05-15) — DOMAIN_PURO. Resolve a classe CSS do card com base
// no `oldestAndNewestMap` (start/end por campoDeVerificacaoId).
//
// Parametros injetados (sem Redux): caller passa o map já resolvido.
import { useMemo } from 'react'

export type OldestNewestMap = Map<any, { start?: any; end?: any; length?: number } | any[]>

export interface UseRegistroStyleArgs {
  registro: any
  oldestAndNewestMap: OldestNewestMap
}

export const useRegistroStyle = ({ registro, oldestAndNewestMap }: UseRegistroStyleArgs) => {
  return useMemo(() => {
    const currentId = registro.id || registro._localId
    const cfg = oldestAndNewestMap?.get?.(registro.campoDeVerificacao?.id)
    if (!cfg || (Array.isArray(cfg) ? cfg.length <= 1 : false)) return ''
    const start = (cfg as any)?.start
    const end = (cfg as any)?.end
    if (currentId == start) return 'custom-row-top'
    if (currentId == end) return 'custom-row-bottom'
    if (registro.fatherId) return 'custom-row'
    return ''
  }, [registro.id, registro._localId, registro.fatherId, registro.campoDeVerificacao?.id, oldestAndNewestMap])
}

export default useRegistroStyle
