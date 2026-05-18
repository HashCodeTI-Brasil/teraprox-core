// Promovido de teraprox-SGP-caderno hook useRegistroDeCampoCard (subset history).
// Wave H.4 (2026-05-15) — DOMAIN_PURO. Estado + fetcher do historico do campo.
//
// IO injetada (Port-style): caller passa `fetchHistoryApi(campoId, range)`.
// Default range: 7 dias atras .. agora, limit=100, order=ASC.
import { useCallback, useState } from 'react'
import dayjs from 'dayjs'

export interface HistoryFilters {
  startDate?: string
  endDate?: string
  limit?: number
  order?: 'ASC' | 'DESC'
}

export interface UseHistoryArgs {
  campoDeVerificacaoId: any
  fetchHistoryApi: (campoId: any, filters: Required<HistoryFilters>) => Promise<any[]>
}

export interface UseHistoryResult {
  showHistory: boolean
  openHistory: () => void
  closeHistory: () => void
  historyData: any[]
  isLoadingHistory: boolean
  fetchHistory: (filters?: HistoryFilters) => Promise<void>
}

export const useHistory = ({ campoDeVerificacaoId, fetchHistoryApi }: UseHistoryArgs): UseHistoryResult => {
  const [showHistory, setShowHistory] = useState(false)
  const [historyData, setHistoryData] = useState<any[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)

  const openHistory = useCallback(() => setShowHistory(true), [])
  const closeHistory = useCallback(() => setShowHistory(false), [])

  const fetchHistory = useCallback(
    async (filters: HistoryFilters = {}) => {
      if (!campoDeVerificacaoId) return
      setIsLoadingHistory(true)
      setShowHistory(true)
      try {
        const range = {
          endDate: filters.endDate || dayjs().format('YYYY-MM-DDTHH:mm:ss'),
          startDate:
            filters.startDate || dayjs().subtract(7, 'day').format('YYYY-MM-DDTHH:mm:ss'),
          limit: filters.limit ?? 100,
          order: filters.order ?? 'ASC',
        } as Required<HistoryFilters>
        const response = await fetchHistoryApi(campoDeVerificacaoId, range)
        setHistoryData(response || [])
      } catch (err) {
        console.error('Erro ao buscar histórico:', err)
      } finally {
        setIsLoadingHistory(false)
      }
    },
    [campoDeVerificacaoId, fetchHistoryApi],
  )

  return {
    showHistory,
    openHistory,
    closeHistory,
    historyData,
    isLoadingHistory,
    fetchHistory,
  }
}

export default useHistory
