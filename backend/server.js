import express from 'express'
import pkg from 'promptpay-qr';
import QRCode from 'qrcode';
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors({ 
    origin: [
        'https://lazypay.onrender.com',
        'http://localhost:5173',
        'http://localhost:3000'
    ],
    credentials: true
}))

const port = process.env.PORT || 3000  // เพิ่ม default port

const generatePayload = pkg.generatePayload || pkg.default?.generatePayload || pkg

// เพิ่ม root route เพื่อเช็คว่า Backend ทำงาน
app.get('/', (req, res) => {
    res.json({ 
        message: 'Backend is running!',
        status: 'ok',
        endpoints: ['/generate-qr']
    })
})

app.post('/generate-qr', async (req, res) => {
    try {
        const { amount } = req.body
        
        if (!amount) {
            return res.status(400).json({ error: "ต้องใส่ amount" })
        }
        
        if (!process.env.PHONENUMBER) {
            return res.status(500).json({ error: "PHONENUMBER ไม่ได้ตั้งค่า" })
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
        console.error('Error generating QR:', err)
        res.status(500).json({ error: "ไม่สามารถสร้าง QR ได้" })
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})