import React, { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import ModalBasicTemplate from "./ModalBasicTemplate"

export interface ImageData {
	key: string
	author?: string
	signedUrl?: string
	dataContext?: string
	dataId?: string | number
}

export interface ImageViewModalProps {
	/** Se o modal está aberto */
	show: boolean
	/** Callback para fechar */
	onHide: () => void
	/** Lista de imagens disponíveis para visualização */
	imagesData: ImageData[]
	/** Imagem inicial selecionada */
	initialImageData?: ImageData
	/** Texto alternativo para a imagem */
	imageAltText?: string
	/** Callback para resolver a URL final da imagem caso não tenha signedUrl */
	resolveImageUrl?: (key: string) => string
}

/**
 * Modal especializado para visualização de uma ou mais imagens com seletor de galeria.
 */
export const ImageViewModal: React.FC<ImageViewModalProps> = ({
	show,
	onHide,
	imagesData = [],
	initialImageData,
	imageAltText = "Visualização de imagem",
	resolveImageUrl
}) => {
	const [selectedImageKey, setSelectedImageKey] = useState<string | null>(null)
	const [imageSrc, setImageSrc] = useState<string | null>(null)
	const [currentAuthor, setCurrentAuthor] = useState<string | "Desconhecido">("Desconhecido")

	useEffect(() => {
		if (show && initialImageData) {
			setSelectedImageKey(initialImageData.key)
			setCurrentAuthor(initialImageData.author || "Desconhecido")
		} else if (show && imagesData.length > 0) {
			setSelectedImageKey(imagesData[0].key)
			setCurrentAuthor(imagesData[0].author || "Desconhecido")
		}
	}, [show, initialImageData])

	useEffect(() => {
		if (show && selectedImageKey) {
			setImageSrc(null) // Reset loader
			const file = imagesData.find(f => f.key === selectedImageKey)
			
			if (file?.signedUrl) {
				setImageSrc(file.signedUrl)
			} else if (resolveImageUrl) {
				setImageSrc(resolveImageUrl(selectedImageKey))
			}
		}
	}, [show, selectedImageKey])

	const renderImageSelector = () => {
		if (imagesData.length <= 1) return null

		return (
			<div className="mb-3 d-flex flex-wrap justify-content-center gap-2">
				{imagesData.map((img, idx) => (
					<Button
						key={idx}
						variant={selectedImageKey === img.key ? "primary" : "outline-secondary"}
						size="sm"
						onClick={() => {
							setSelectedImageKey(img.key)
							setCurrentAuthor(img.author || "Desconhecido")
						}}
					>
						{img.dataContext ? `${img.dataContext}-${img.dataId}` : `Imagem ${idx + 1}`}
					</Button>
				))}
			</div>
		)
	}

	const body = (
		<div className="text-center">
			{renderImageSelector()}
			{imageSrc ? (
				<img
					src={imageSrc}
					alt={imageAltText}
					className="img-fluid rounded shadow-sm"
					style={{ maxHeight: "75vh", objectFit: 'contain' }}
				/>
			) : (
				<div className="p-5 text-muted">Aguardando imagem...</div>
			)}
		</div>
	)

	return (
		<ModalBasicTemplate
			header="Visualização de Imagem"
			closeFunc={onHide}
			show={show}
			body={body}
			props={{ size: "lg" }}
			footer={() => (
				<div className="w-100 d-flex justify-content-between align-items-center">
					<small className="text-muted">Enviado por: <strong>{currentAuthor}</strong></small>
					<Button variant="outline-secondary" size="sm" onClick={onHide}>Fechar</Button>
				</div>
			)}
		/>
	)
}

export default ImageViewModal
