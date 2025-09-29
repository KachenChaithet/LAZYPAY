import express from 'express'
import pkg from 'promptpay-qr';
import QRCode from 'qrcode';
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(express.json())

// แก้ CORS ให้ตรงกับ Frontend URL จริง
app.use(cors({ 
    origin: [
        'https://lazypay.onrender.com',  // Frontend URL ของคุณ
        'http://localhost:5173',         // สำหรับ dev
        'http://localhost:5174'
    ],
    credentials: true
}))

const port = process.env.PORT || 3000

const generatePayload = pkg.generatePayload || pkg.default?.generatePayload || pkg

app.post('/generate-qr', async (req, res) => {
    try {
        const { amount } = req.body
        if (!amount) {
            return res.status(400).json({ error: "ต้องใส่ amount" })
        }
        
        const payload = generatePayload(process.env.PHONENUMBER, { 
            amount: parseFloat(amount) 
        })
        
        // แปลง payload เป็น base64 image ส่งกลับไป
        const qrImage = await QRCode.toDataURL(payload, {
            color: {
                dark: "#000000",
                light: "#FFFFFF",
            },
            width: 300,
            margin: 2,
        })
        
        res.json({ qr: qrImage })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "ไม่สามารถสร้าง QR ได้" })
    }
})

app.listen(port, () => {
    console.log('Server running on port', port);
})