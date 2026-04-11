import React, { useState } from "react"
import { BsQrCode } from "react-icons/bs"
import { QrReader } from "./QrReader"

export interface QrCodeScanButtonProps {
	/** Callback chamado com o valor lido do QR Code */
	callback: (result: string) => void
	/** Tamanho do ícone (padrão: 25) */
	size?: number
}

/**
 * Botão que alterna a visualização do scanner de QR Code.
 */
export const QrCodeScanButton: React.FC<QrCodeScanButtonProps> = ({ callback, size = 25 }) => {
	const [showQr, setShowQr] = useState(false)

	const toggleQr = () => {
		setShowQr(prev => !prev)
	}

	return (
		<div
			className="hoverable-div"
			style={{
				border: "solid",
				borderTopRightRadius: "3px",
				borderBottomRightRadius: "3px",
				padding: "8px",
				borderLeft: "none",
				borderColor: "#ccc",
				borderWidth: "1px",
				cursor: "pointer",
				display: 'flex',
				alignItems: 'center'
			}}
			onClick={toggleQr}
		>
			<BsQrCode size={size} />

			{showQr && (
				<div style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(0,0,0,0.8)',
					zIndex: 9999,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '20px'
				}}
				onClick={(e) => e.stopPropagation()}
				>
					<div style={{ width: '100%', maxWidth: '500px', backgroundColor: '#fff', borderRadius: '12px', padding: '20px', position: 'relative' }}>
						<div 
							onClick={toggleQr}
							style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '1.5rem', cursor: 'pointer', zIndex: 10001 }}
						>
							&times;
						</div>
						<h5 className="mb-3 text-center">Escaneie o QR Code</h5>
						<QrReader
							callback={(v) => {
								toggleQr()
								callback(v)
							}}
						/>
						<p className="mt-3 text-muted text-center small">Aponte a câmera para o código</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default QrCodeScanButton
