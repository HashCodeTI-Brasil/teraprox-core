import QrScanner from 'qr-scanner'
import { useEffect, useRef, useState } from 'react'

interface QrReaderProps {
  callback: (result: string) => void
}

const QrReader = ({ callback }: QrReaderProps) => {
  const scanner = useRef<QrScanner | null>(null)
  const videoEl = useRef<HTMLVideoElement | null>(null)
  const qrBoxEl = useRef<HTMLDivElement | null>(null)
  const [qrOn, setQrOn] = useState(true)
  const [scannedResult, setScannedResult] = useState('')

  const onScanSuccess = (result: QrScanner.ScanResult) => {
    setScannedResult(result?.data)
    callback(result?.data)
  }

  const onScanFail = (err: Error | string) => {
    console.error(err)
  }

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: 'environment',
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      })

      scanner.current
        .start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false)
        })
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop()
      }
    }
  }, [])

  useEffect(() => {
    if (!qrOn)
      alert(
        'Camera está bloqueada ou inacessível. Por Favor habilite a camera nas permissões do seu navegador e recarregue a página.'
      )
  }, [qrOn])

  return (
    <div className="qr-reader">
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className="qr-box"></div>

      {scannedResult && (
        <p
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 99999,
            color: 'white',
          }}
        >
          Scanned Result: {scannedResult}
        </p>
      )}
    </div>
  )
}

export default QrReader
