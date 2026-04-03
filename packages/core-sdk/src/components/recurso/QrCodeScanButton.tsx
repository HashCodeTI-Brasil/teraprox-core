import { useState } from 'react'
import { BsQrCode } from 'react-icons/bs'
import QrReader from './QrReader'

interface QrCodeScanButtonProps {
  callback: (result: string) => void
}

const QrCodeScanButton = ({ callback }: QrCodeScanButtonProps) => {
  const [showQr, setShowQr] = useState(false)

  const qrShowHandler = () => {
    setShowQr((prev) => !prev)
  }

  return (
    <div
      className="hoverable-div"
      style={{
        border: 'solid',
        borderTopRightRadius: '3px',
        borderBottomRightRadius: '3px',
        padding: '8px',
        borderLeft: 'none',
        borderColor: '#ccc',
        borderWidth: '1px',
      }}
    >
      {showQr && (
        <QrReader
          callback={(v) => {
            qrShowHandler()
            callback(v)
          }}
        />
      )}
      <BsQrCode
        size={25}
        onClick={() => {
          qrShowHandler()
        }}
      />
    </div>
  )
}

export default QrCodeScanButton
