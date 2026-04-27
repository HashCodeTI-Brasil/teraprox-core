/**
 * Representação de um anexo persistido (retornado pela API).
 */
export interface AnexoPersistido {
  id: string | number
  nome: string
  tipo: string
  tamanho?: number
  /** Chave no object storage — necessária para `POST /anexo/signedUrl` (API não usa só anexoId). */
  key?: string
  url?: string
  signedUrl?: string
  context?: string
  entityId?: string | number
  createdAt?: string
}

/**
 * Representação de um anexo local (selecionado mas ainda não enviado).
 */
export interface AnexoLocal {
  localId: string
  file: File
  nome: string
  tipo: string
  tamanho: number
  progress: number
  status: 'pending' | 'uploading' | 'done' | 'error'
  errorMessage?: string
}

/**
 * Resultado da intent de upload (signed URL da nuvem).
 */
export interface UploadIntent {
  /** URL for signed upload — API may return as `uploadUrl` or `signedUrl`. */
  signedUrl?: string
  uploadUrl?: string
  key?: string
  anexoId?: string | number
  fileName?: string
  contentType?: string
  dataId?: string
  dataContext?: string
  fields?: Record<string, string>
}

/**
 * Port Hexagonal para operações de anexo.
 * Permite que qualquer módulo federado gerencie anexos de forma uniforme,
 * sem conhecer detalhes de implementação (GCS, S3, local, etc.).
 */
export interface IAnexoPort {
  /** Solicita intent de upload ao backend (retorna signed URL). */
  intent(params: { nome: string; tipo: string; tamanho: number; context: string; entityId: string | number }): Promise<UploadIntent>

  /** Confirma que o upload para a signed URL foi concluído (alguns backends não usam anexoId — só key + dataId). */
  confirm(params: {
    anexoId?: string | number
    context: string
    entityId: string | number
    key: string
    fileName: string
    contentType: string
  }): Promise<AnexoPersistido>

  /** Upload direto via FormData (fallback quando signed URL não está disponível). */
  uploadDirect(params: { file: File; context: string; entityId: string | number; path?: string }): Promise<AnexoPersistido>

  /** Lê todos os anexos de uma entidade num contexto. */
  readByEntity(context: string, entityId: string | number): Promise<AnexoPersistido[]>

  /** Obtém URL assinada para download/visualização (corpo `{ key }` na API onRoad; `anexoId` é fallback). */
  getSignedUrl(anexoId: string | number, key?: string): Promise<string>

  /** Remove um anexo pelo ID. */
  remove(anexoId: string | number): Promise<void>
}
