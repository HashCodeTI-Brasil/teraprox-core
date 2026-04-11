import { Badge } from "react-bootstrap"

const IconWithBadge = ({ icon, content, mode = "overlay", bg = "danger" }) => {
	if (mode === "inline") {
		return (
			<div
				style={{
					display: "inline-flex",
					alignItems: "center",
					gap: "6px",
				}}
			>
				{icon}
				{content ? (
					<Badge
						bg={bg}
						pill
						style={{
							fontSize: "10px",
							fontWeight: 600,
							padding: "2px 6px",
							minWidth: "18px",
							lineHeight: 1.2,
							opacity: 0.9,
						}}
					>
						{content}
					</Badge>
				) : null}
			</div>
		)
	}

	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			{icon}
			<Badge
				bg={bg}
				style={{
					position: "absolute",
					top: "-5px",
					right: "-10px",
					padding: "5px",
					borderRadius: "50%",
					minWidth: "20px",
					minHeight: "20px",
					fontSize: "12px",
					alignItems: "center",
					justifyContent: "center",
					display: content ? "flex" : "none",
				}}
			>
				{content}
			</Badge>
		</div>
	)
}
export default IconWithBadge
