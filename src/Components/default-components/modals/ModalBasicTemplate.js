import { useState } from "react"

/**
 * ModalBasicTemplate — lightweight modal overlay.
 * No external CSS required. Inline styles only.
 */
const ModalBasicTemplate = ({
	show,
	closeFunc,
	header,
	body,
	footer,
}) => {
	if (!show) return null

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "rgba(0,0,0,0.5)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				zIndex: 1000,
			}}
		>
			<div
				style={{
					background: "#fff",
					borderRadius: "8px",
					width: "90%",
					maxWidth: "500px",
					maxHeight: "90vh",
					boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<div
					style={{
						padding: "1rem",
						borderBottom: "1px solid #ddd",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						flex: "0 0 auto",
					}}
				>
					<div>
						{header && typeof header === "function" ? header() : header}
					</div>
					<button
						onClick={closeFunc}
						style={{
							border: "none",
							background: "transparent",
							fontSize: "1.5rem",
							cursor: "pointer",
						}}
						aria-label="Close"
					>
						&times;
					</button>
				</div>

				<div
					style={{
						padding: "1rem",
						overflowY: "auto",
						flex: "1 1 auto",
					}}
				>
					{body && typeof body === "function" ? body() : body}
				</div>

				{footer && (
					<div
						style={{
							padding: "1rem",
							borderTop: "1px solid #ddd",
							textAlign: "right",
							flex: "0 0 auto",
						}}
					>
						{typeof footer === "function" ? footer() : footer}
					</div>
				)}
			</div>
		</div>
	)
}

export default ModalBasicTemplate
