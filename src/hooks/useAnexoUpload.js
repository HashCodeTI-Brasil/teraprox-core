import { useState, useCallback } from 'react';
import { usePostData } from '../usePostData';
import { useWebProvider } from '../useWebProvider';

/**
 * useAnexoUpload
 * 
 * Hook para lidar com o fluxo de 3 etapas de upload direto (Pre-signed URL):
 * 1. Intent (Server)
 * 2. Upload (GCS)
 * 3. Confirm (Server)
 */
export const useAnexoUpload = (apiContext = 'manutencao') => {
  const { post } = usePostData();
  const { notify } = useWebProvider();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = useCallback(async (file, dataId, dataContext) => {
    setUploading(true);
    setProgress(0);
    try {
      // 1. Solicita intenção de upload ao backend
      const intentResponse = await post(`/anexo/intent`, {
        fileName: file.name,
        contentType: file.type || 'application/octet-stream',
        dataId,
        dataContext
      }, { context: apiContext });

      if (!intentResponse || !intentResponse.uploadUrl) {
        throw new Error('Falha ao gerar URL de upload');
      }

      const { uploadUrl, key } = intentResponse;

      // 2. Upload direto para o Cloud Storage via PUT (Pre-signed URL)
      const uploadResult = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', uploadUrl, true);
        xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
        
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 201) resolve(true);
          else reject(new Error(`Upload falhou com status ${xhr.status}`));
        };

        xhr.onerror = () => reject(new Error('Erro de rede durante o upload'));
        xhr.send(file);
      });

      // 3. Confirma o upload no backend (persiste registro no DB)
      const confirmResponse = await post(`/anexo/confirm`, {
        key,
        dataId,
        dataContext,
        fileName: file.name,
        contentType: file.type || 'application/octet-stream'
      }, { context: apiContext });

      notify('Arquivo enviado com sucesso!', 'success');
      return confirmResponse;
    } catch (error) {
      console.error('Upload Error:', error);
      notify(error.message || 'Erro ao enviar arquivo', 'error');
      throw error;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }, [post, notify, apiContext]);

  return {
    uploadFile,
    uploading,
    progress
  };
};
