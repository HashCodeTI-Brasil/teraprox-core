import QrScanner from "qr-scanner"
import React, { useEffect, useRef, useState } from "react"

export interface QrReaderProps {
    /** Callback chamado com o valor lido do QR Code */
    callback: (result: string) => void
}

/**
 * Componente para leitura de QR Code usando a câmera do dispositivo.
 */
export const QrReader: React.FC<QrReaderProps> = ({ callback }) => {
    const scanner = useRef<QrScanner | null>(null)
    const videoEl = useRef<HTMLVideoElement>(null)
    const qrBoxEl = useRef<HTMLDivElement>(null)
    const [qrOn, setQrOn] = useState(true)
    const [scannedResult, setScannedResult] = useState("")

    const onScanSuccess = (result: QrScanner.ScanResult) => {
        setScannedResult(result.data)
        callback(result.data)
    }

    const onScanFail = (err: string | Error) => {
        // Erros de decodificação são comuns durante a busca, não logamos tudo
        if (typeof err === 'string' && !err.includes('No QR code found')) {
            console.error("QR Scanner Error:", err)
        }
    }

    useEffect(() => {
        if (videoEl.current && !scanner.current) {
            scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
                onDecodeError: onScanFail,
                preferredCamera: "environment",
                highlightScanRegion: true,
                highlightCodeOutline: true,
                overlay: qrBoxEl.current || undefined,
            })

            scanner.current
                .start()
                .then(() => setQrOn(true))
                .catch((err) => {
                    console.error("Failed to start QR Scanner:", err)
                    setQrOn(false)
                })
        }

        return () => {
            if (scanner.current) {
                scanner.current.stop()
                scanner.current.destroy()
                scanner.current = null
            }
        }
    }, [])

    useEffect(() => {
        if (!qrOn) {
            alert(
                "Câmera está bloqueada ou inacessível. Por favor, habilite a câmera nas permissões do seu navegador e recarregue a página."
            )
        }
    }, [qrOn])

    return (
        <div className="qr-reader" style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <video ref={videoEl} style={{ width: '100%', borderRadius: '8px' }}></video>
            <div ref={qrBoxEl} className="qr-box"></div>

            {scannedResult && (
                <div
                    style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        zIndex: 10,
                        background: "rgba(0,0,0,0.6)",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "0.8rem"
                    }}
                >
                    Lido: {scannedResult}
                </div>
            )}
        </div>
    )
}

export default QrReader
