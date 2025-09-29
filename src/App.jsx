import { AwardIcon, Download } from 'lucide-react'
import './index.css'
import { useState } from 'react'
import axios from 'axios'


function App() {
  const [Amount, setAmount] = useState()
  const [qr, setQr] = useState('')

  const handleCreateQrCode = async () => {
    try {
      const response = await axios.post('https://lazypay.onrender.com/generate-qr', { amount: Amount })
      setQr(response.data)
    } catch (error) {
      return console.log(error);

    }
  }

  return (
    <>
      <div className="h-screen flex justify-start gap-8 mt-10 items-center flex-col ">
        <div className="flex flex-col items-center gap-4">
          <h1 className='text-4xl font-semibold text-blue-900'>นี่คือqr code กูเอง</h1>
          <input type="number" className='border rounded-lg border-blue-900 w-full' value={Amount} onChange={(e) => {
            const value = e.target.value
            if (/^\d*$/.test(value)) { // regex เช็กว่าเป็นตัวเลขล้วน
              setAmount(Number(value))
            }
          }} placeholder='กรอกจำนวนเงิน...' />
          <button className='bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2' onClick={handleCreateQrCode}>gennerate qe code</button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className='text-2xl font-semibold'>QR CODE คเชนทร์ ชัยเทศ</h1>
          <img src={qr.qr} alt="" className='w-[200px] h-[200px] bg-blue-900' />
          <button
            className='flex justify-center gap-2 items-center bg-green-500 text-white px-4 py-2 rounded-lg'
            onClick={() => {
              if (!qr.qr) return
              const link = document.createElement('a')
              link.href = qr.qr          // base64 image
              link.download = 'promptpay-qr.png'
              link.click()
            }}
          >
            <Download /> Download
          </button>


        </div>
      </div>
    </>
  )
}

export default App
