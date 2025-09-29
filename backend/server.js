import express from 'express'
import pkg from 'promptpay-qr';
import QRCode from 'qrcode';
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors({ origin: 'https://frontend-yourapp.onrender.com'}))


const port = process.env.PORT
const generatePayload =
    pkg.generatePayload || pkg.default?.generatePayload || pkg

app.post('/generate-qr', async (req, res) => {
    try {
        const { amount } = req.body

        if (!amount) {
            return res.status(400).json({ error: "ต้องใส่ phoneNumber และ amount" })
        }

        const payload = generatePayload(process.env.PHONENUMBER, { amount: parseFloat(amount) })

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
    console.log('server run on port', port);

})