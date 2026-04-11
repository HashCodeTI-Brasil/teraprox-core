import React, { useCallback } from "react";
import { useDropzone, Accept } from "react-dropzone";
import { FiUploadCloud, FiCheckCircle } from "react-icons/fi";
import "../styles/UploadArea.css";

export interface UploadAreaProps {
	/** Callback chamado ao selecionar um arquivo */
	onFilePut: (file: File) => void;
	/** Objeto do arquivo já anexado (opcional) */
	anexo?: { name: string } | null;
	/** Tipos de arquivos aceitos (padrão: JPEG, PNG) */
	accept?: Accept;
	/** Tamanho máximo em bytes (padrão: 50MB) */
	maxSize?: number;
}

/**
 * Área de upload com suporte a Drag & Drop e indicação de arquivo anexado.
 */
export const UploadArea: React.FC<UploadAreaProps> = ({
	onFilePut,
	anexo,
	accept = { "image/jpeg": [], "image/png": [] },
	maxSize = 50 * 1024 * 1024,
}) => {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			if (file && typeof onFilePut === "function") {
				onFilePut(file);
			}
		},
		[onFilePut]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		maxSize,
		accept,
	});

	const hasAnexo = Boolean(anexo);

	return (
		<div
			{...getRootProps()}
			className={`upload-area 
				${isDragActive ? "drag-active" : ""} 
				${hasAnexo ? "upload-has-file" : ""}
			`}
		>
			<input {...getInputProps()} />
			<div className="upload-content">
				<span className="upload-icon">
					{hasAnexo ? (
						<FiCheckCircle size={24} />
					) : (
						<FiUploadCloud size={24} />
					)}
				</span>
				{hasAnexo ? (
					<>
						<p className="upload-link">Arquivo anexado</p>
						<p className="upload-info">{anexo?.name}</p>
					</>
				) : (
					<>
						<p>
							<span className="upload-link">Adicione</span> ou arraste
							arquivos aqui
						</p>
						<p className="upload-info">
							Formatos aceitos: <b>{Object.keys(accept).map(t => t.split('/')[1].toUpperCase()).join(', ')}</b> | Tamanho máximo:{" "}
							<b>{(maxSize / (1024 * 1024)).toFixed(0)}MB</b>
						</p>
					</>
				)}
			</div>
		</div>
	);
};

export default UploadArea;
