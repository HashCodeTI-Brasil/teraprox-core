import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { FaDownload, FaEye, FaPaperclip, FaTrash, FaPlus, FaFile, FaFilePdf, FaFileAudio, FaFileVideo, FaFileWord, FaFileExcel } from "react-icons/fa"
import { useSelector } from "react-redux"
import { Button, ListGroup, Badge, Tooltip, OverlayTrigger } from "react-bootstrap"
import IconWithBadge from "../icons/IconWithBadge"
import ModalBasicTemplate from "../modals/ModalBasicTemplate"
import ImageViewModal from "../modals/ImageViewModal"

/**
 * GenericImageAttachment — GCS-native file attachment UI.
 *
 * Resolves GCS signed read URLs on demand via the `apiEndpoint` prop.
 * No legacy (WhaleTamer/S3) fallback — this component requires the
 * GCS signed-URL flow provided by onRoad's AnexoController.
 *
 * @prop {string}   apiEndpoint          — Base API URL (e.g. endPointCaderno). REQUIRED for URL resolution.
 * @prop {Object[]} filesData            — Array of file objects from the API (with key, originalName, contentType, etc.)
 * @prop {Function} onUpload             — Callback receiving the File object to upload.
 * @prop {Function} onDeleteAttachment   — Callback receiving the file object to delete.
 * @prop {Function} onView               — Optional external view handler; overrides internal preview.
 * @prop {Function} onDownload           — Optional external download handler.
 * @prop {boolean}  disableDownload
 * @prop {boolean}  disableExclusion
 * @prop {boolean}  disableView
 * @prop {boolean}  disableUpload
 */
const GenericImageAttachment = forwardRef(({
	filesData = [],
	onView,
	onDownload,
	onDeleteAttachment,
	disableDownload = false,
	disableExclusion = false,
	disableView = false,
	disableUpload = false,
	onUpload = null,
	apiEndpoint = null,
}, ref) => {
	const [showManager, setShowManager] = useState(false)
	const [showPreview, setShowPreview] = useState(false)
	const [selectedPreviewFile, setSelectedPreviewFile] = useState(null)
	const [loading, setLoading] = useState(null)
	const [resolvedUrls, setResolvedUrls] = useState({})

	const token = useSelector((state) => state.global.token)

	const validFiles = Array.isArray(filesData)
		? filesData.filter(f => f && typeof f === "object" && (f.id || f.key || f.dataId))
		: []

	// --- URL resolution (GCS signed URLs) ---

	const getFileUrl = async (file) => {
		if (file.signedUrl) return file.signedUrl
		if (resolvedUrls[file.key]) return resolvedUrls[file.key]
		if (apiEndpoint && file.key) {
			try {
				const res = await fetch(`${apiEndpoint}anexo/signedUrl`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`,
					},
					body: JSON.stringify({ key: file.key }),
				})
				const data = await res.json()
				if (data.signedUrl) {
					setResolvedUrls(prev => ({ ...prev, [file.key]: data.signedUrl }))
					return data.signedUrl
				}
			} catch (e) {
				console.warn("Failed to resolve signedUrl for", file.key, e)
			}
		}
		return null
	}

	const getFileUrlSync = (file) => {
		return file.signedUrl || resolvedUrls[file.key] || null
	}

	useEffect(() => {
		if (!showManager && !showPreview) return
		const filesToResolve = validFiles.filter(
			f => !f.signedUrl && !resolvedUrls[f.key] && f.key && apiEndpoint
		)
		if (filesToResolve.length === 0) return
		let cancelled = false
		Promise.all(filesToResolve.map(f => getFileUrl(f))).then(() => {
			if (!cancelled) setResolvedUrls(prev => ({ ...prev }))
		})
		return () => { cancelled = true }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showManager, showPreview, validFiles.length])

	useImperativeHandle(ref, () => ({
		openManager: () => setShowManager(true),
	}))

	const hasFiles = validFiles.length > 0

	// --- Helpers ---

	const buildFileName = (file) => {
		if (file.originalName) return file.originalName
		if (file.name) return file.name
		const ext = file.fileType || "file"
		return `${file.dataContext || "anexo"}-${file.dataId}.${ext}`
	}

	const isImage = (file) => {
		const ct = file.contentType || ""
		const ft = file.fileType || ""
		return ct.startsWith("image/") || ["png", "jpg", "jpeg", "gif", "webp"].includes(ft)
	}

	const isPdf = (file) => {
		const ct = file.contentType || ""
		return ct === "application/pdf" || (file.fileType || "").toLowerCase() === "pdf"
	}

	const isVideo = (file) => {
		const ct = file.contentType || ""
		return ct.startsWith("video/") || ["mp4", "mov", "avi", "mkv", "webm"].includes((file.fileType || "").toLowerCase())
	}

	const isAudio = (file) => {
		const ct = file.contentType || ""
		return ct.startsWith("audio/") || ["mp3", "wav", "ogg", "aac", "m4a"].includes((file.fileType || "").toLowerCase())
	}

	const getFileIcon = (file) => {
		if (isPdf(file)) return <FaFilePdf className="text-danger" />
		if (isAudio(file)) return <FaFileAudio className="text-info" />
		if (isVideo(file)) return <FaFileVideo className="text-warning" />
		const ft = (file.fileType || "").toLowerCase()
		if (["doc", "docx"].includes(ft)) return <FaFileWord className="text-primary" />
		if (["xls", "xlsx"].includes(ft)) return <FaFileExcel className="text-success" />
		return <FaFile className="text-secondary" />
	}

	const getFileTypeLabel = (file) => {
		if (isImage(file)) return "Imagem"
		if (isPdf(file)) return "PDF"
		if (isAudio(file)) return "Áudio"
		if (isVideo(file)) return "Vídeo"
		const ft = (file.fileType || "").toUpperCase()
		return ft || "Arquivo"
	}

	// --- Actions ---

	const handleUpload = (e) => {
		const file = e.target.files[0]
		if (file && onUpload) {
			onUpload(file)
		}
	}

	const triggerDownload = (url, filename) => {
		const link = document.createElement("a")
		link.download = filename
		link.href = url
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	const handleDownloadFile = (file) => {
		if (typeof onDownload === "function") {
			onDownload([file])
		} else {
			const filename = buildFileName(file)
			const url = getFileUrlSync(file)
			if (url) triggerDownload(url, filename)
		}
	}

	const handleViewFile = (file) => {
		if (typeof onView === "function") {
			onView([file])
		} else if (isImage(file)) {
			setSelectedPreviewFile(file)
			setShowPreview(true)
		} else if (isPdf(file)) {
			const url = getFileUrlSync(file)
			if (url) window.open(url, "_blank")
		} else {
			handleDownloadFile(file)
		}
	}

	const handleDelete = async (file) => {
		if (typeof onDeleteAttachment === "function") {
			try {
				setLoading(file.id || file.key)
				await onDeleteAttachment(file)
			} catch (e) {
				console.error("Erro ao excluir", e)
			} finally {
				setLoading(null)
			}
		}
	}

	// --- Renders ---

	const renderListItem = (file, idx) => {
		const fileName = buildFileName(file)
		const isImg = isImage(file)
		const imageUrl = getFileUrlSync(file)

		return (
			<ListGroup.Item
				key={file.id || file.key || idx}
				className="d-flex align-items-center justify-content-between p-2"
				style={{ fontSize: "14px" }}
			>
				<div className="d-flex align-items-center gap-3 overflow-hidden">
					<div
						style={{
							width: "40px",
							height: "40px",
							backgroundColor: "#f8f9fa",
							borderRadius: "4px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							border: "1px solid #dee2e6",
							flexShrink: 0,
							overflow: "hidden",
							cursor: !disableView ? "pointer" : "default",
						}}
						onClick={() => !disableView && handleViewFile(file)}
					>
						{isImg && imageUrl ? (
							<img src={imageUrl} alt="thumb" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
						) : (
						getFileIcon(file)
					)}
				</div>
				<div className="text-truncate" title={fileName}>
					<div className="fw-bold text-truncate">{fileName}</div>
					<small className="text-muted">{getFileTypeLabel(file)}</small>
					</div>
				</div>

				<div className="d-flex gap-2">
					{!disableView && (
						<OverlayTrigger overlay={<Tooltip>Visualizar</Tooltip>}>
							<Button variant="outline-secondary" size="sm" onClick={() => handleViewFile(file)}>
								<FaEye />
							</Button>
						</OverlayTrigger>
					)}
					{!disableDownload && (
						<OverlayTrigger overlay={<Tooltip>Baixar</Tooltip>}>
							<Button variant="outline-primary" size="sm" onClick={() => handleDownloadFile(file)}>
								<FaDownload />
							</Button>
						</OverlayTrigger>
					)}
					{!disableExclusion && (
						<OverlayTrigger overlay={<Tooltip>Excluir</Tooltip>}>
							<Button
								variant="outline-danger"
								size="sm"
								disabled={loading === (file.id || file.key)}
								onClick={() => handleDelete(file)}
							>
								{loading === (file.id || file.key) ? "..." : <FaTrash />}
							</Button>
						</OverlayTrigger>
					)}
				</div>
			</ListGroup.Item>
		)
	}

	const renderManagerModal = () => (
		<ModalBasicTemplate
			show={showManager}
			closeFunc={() => setShowManager(false)}
			header={() => (
				<div className="d-flex align-items-center gap-2">
					<FaPaperclip /> Gerenciar Anexos
					{hasFiles && <Badge bg="secondary">{validFiles.length}</Badge>}
				</div>
			)}
			body={() => (
				<div className="d-flex flex-column gap-3">
					{!hasFiles && (
						<div className="text-center py-4 text-muted">
							<FaPaperclip size={32} className="mb-2 opacity-50" />
							<p>Nenhum anexo encontrado.</p>
						</div>
					)}

					{hasFiles && (
						<ListGroup variant="flush" className="border rounded">
							{validFiles.map((f, i) => renderListItem(f, i))}
						</ListGroup>
					)}

					{!disableUpload && onUpload && (
						<div className="d-grid mt-2">
							<input
								type="file"
								id={`file-upload-${Math.random()}`}
								onChange={handleUpload}
								style={{ display: "none" }}
								accept="image/*,.pdf"
							/>
							<Button
								variant="outline-primary"
								onClick={(e) => {
									e.currentTarget.previousSibling.click()
								}}
								className="d-flex align-items-center justify-content-center gap-2"
							>
								<FaPlus /> Adicionar Novo Anexo
							</Button>
							<small className="text-muted text-center mt-1">
							Suporta qualquer tipo de arquivo
							</small>
						</div>
					)}
				</div>
			)}
			footer={() => (
				<Button variant="secondary" onClick={() => setShowManager(false)}>
					Fechar
				</Button>
			)}
		/>
	)

	return (
		<>
			<div
				data-attachment-trigger="true"
				onClick={(e) => {
					e.stopPropagation()
					setShowManager(true)
				}}
				className="d-inline-flex align-items-center justify-content-center"
				style={{
					cursor: "pointer",
					transition: "transform 0.1s",
					padding: "4px",
				}}
				title={hasFiles ? `${validFiles.length} Anexo(s)` : "Gerenciar Anexos"}
			>
				<IconWithBadge
					icon={
						<FaPaperclip
							size={20}
							color={hasFiles ? "#0d6efd" : "#6c757d"}
							style={{ opacity: hasFiles ? 1 : 0.7 }}
						/>
					}
					content={hasFiles ? validFiles.length : null}
				/>
			</div>

			{renderManagerModal()}

			{showPreview && selectedPreviewFile && (
				<ImageViewModal
					show={showPreview}
					onHide={() => {
						setShowPreview(false)
						setSelectedPreviewFile(null)
					}}
					imagesData={validFiles.map(f => ({
						...f,
						signedUrl: f.signedUrl || resolvedUrls[f.key],
					}))}
					imageData={{
						...selectedPreviewFile,
						signedUrl: selectedPreviewFile.signedUrl || resolvedUrls[selectedPreviewFile.key],
					}}
					imageAltText="Visualização do Anexo"
				/>
			)}
		</>
	)
})

export default GenericImageAttachment
