import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import ModalBasicTemplate from "./ModalBasicTemplate"

/**
 * ImageViewModal — full-screen image preview with multi-image navigation.
 * GCS-native: uses `signedUrl` from file data for image source.
 */
const ImageViewModal = ({
	show,
	onHide,
	imagesData = [],
	imageData,
	imageAltText,
}) => {
	const [imageSrc, setImageSrc] = useState(null)
	const [author, setAuthor] = useState(
		imageData?.author || imagesData[0]?.author
	)
	const [selectedImage, setSelectedImage] = useState(
		imageData?.key || imagesData[0]?.key
	)

	useEffect(() => {
		if (show && selectedImage) {
			setImageSrc(null)
			const file = imagesData.find(f => f.key === selectedImage) || imageData
			const url = file?.signedUrl
			setImageSrc(url || null)
		}
	}, [show, selectedImage])

	const renderImageSelector = () => {
		if (imagesData.length <= 1) return null

		return (
			<div className="mb-3 d-flex flex-wrap justify-content-center gap-2">
				{imagesData.map(({ key, dataContext, dataId, author: a }, idx) => (
					<button
						key={idx}
						className={`btn btn-sm ${
							selectedImage === key
								? "btn-primary"
								: "btn-outline-secondary"
						}`}
						onClick={() => {
							setSelectedImage(key)
							setAuthor(a)
						}}
					>
						{`${dataContext}-${dataId}`}
					</button>
				))}
			</div>
		)
	}

	const body = (
		<>
			{renderImageSelector()}
			{imageSrc ? (
				<img
					src={imageSrc}
					alt={imageAltText}
					className="img-fluid"
					style={{ maxHeight: "80vh" }}
				/>
			) : (
				<p>Carregando imagem...</p>
			)}
		</>
	)

	return (
		<ModalBasicTemplate
			header={() => <h4>Visualização da Imagem</h4>}
			closeFunc={onHide}
			show={show}
			body={body}
			footer={() => (
				<div className="d-flex justify-content-between align-items-center">
					<p style={{ opacity: 0.5 }}>{`enviado por: ${author}`}</p>
				</div>
			)}
		/>
	)
}

export default ImageViewModal
