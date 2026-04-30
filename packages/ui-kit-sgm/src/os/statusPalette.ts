/**
 * Paleta canônica de status de Ordem de Serviço — promovida do
 * teraprox-SGM-OS/src/ui/statusPalette.js para uso compartilhado em
 * componentes do ui-kit-sgm (OsCard, etc).
 */

export interface OsStatusMeta {
  color: string
  label: string
}

export const OS_STATUS_PALETTE: Record<string, OsStatusMeta> = {
  CONCLUIDO:          { color: '#3DBE5B', label: 'Concluída' },
  PENDENTE:           { color: '#2D8CFF', label: 'Pendente' },
  ATRASADO:           { color: '#FF4D4F', label: 'Atrasado' },
  EXECUTANDO:         { color: '#FF9F1A', label: 'Executando' },
  AGUARDANDO_RECURSO: { color: '#FF7F50', label: 'Aguardando Recurso' },
  EM_DIA:             { color: '#26A69A', label: 'Em Dia' },
  CANCELED:           { color: '#9E9E9E', label: 'Cancelada' },
  DEFAULT:            { color: '#BDBDBD', label: 'Indefinido' },
}

export function getOsStatusMeta(status?: string): OsStatusMeta {
  if (!status) return OS_STATUS_PALETTE.DEFAULT
  return OS_STATUS_PALETTE[status] || OS_STATUS_PALETTE.DEFAULT
}
