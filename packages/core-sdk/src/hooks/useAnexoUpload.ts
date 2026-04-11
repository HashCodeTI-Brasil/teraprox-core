import { useState, useCallback } from 'react'
import { useCoreService } from './useCoreService'
import { useToast } from './useToast'

interface AnexoUploadReturn {
  uploading: boolean
  progress: number
  upload: (context: string, path: string, file: File, extraHeaders?: Record<string, string>) => Promise<any>
  uploadMultiple: (context: string, path: string, files: FileList | File[], extraHeaders?: Record<string, string>) => Promise<any[]>
}

/**
 * Hook for attachment uploads via HttpController.
 * Replaces the duplicated useAnexoUpload in SGM/SGP.
 */
export function useAnexoUpload(): AnexoUploadReturn {
  const { createController } = useCoreService()
  const toast = useToast()
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const upload = useCallback(
    async (context: string, path: string, file: File, extraHeaders?: Record<string, string>) => {
      const controller = createController(context)
      setUploading(true)
      setProgress(0)
      try {
        const formData = new FormData()
        formData.append('file', file)
        const result = await controller.post(path, formData, {
          'Content-Type': 'multipart/form-data',
          ...extraHeaders,
        })
        setProgress(100)
        return result
      } catch (err: any) {
        toast.error(err?.message || 'Erro ao enviar anexo')
        throw err
      } finally {
        setUploading(false)
      }
    },
    [createController, toast]
  )

  const uploadMultiple = useCallback(
    async (context: string, path: string, files: FileList | File[], extraHeaders?: Record<string, string>) => {
      const fileArray = Array.from(files)
      const results: any[] = []
      for (let i = 0; i < fileArray.length; i++) {
        setProgress(Math.round((i / fileArray.length) * 100))
        const res = await upload(context, path, fileArray[i], extraHeaders)
        results.push(res)
      }
      setProgress(100)
      return results
    },
    [upload]
  )

  return { uploading, progress, upload, uploadMultiple }
}
