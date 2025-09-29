# LAZYPAY

LAZYPAY เป็นแอปพลิเคชันสร้าง **QR PromptPay** แบบรวดเร็วและสะดวกสำหรับผู้ใช้ที่ไม่อยากเปิดแอปธนาคาร เพียงกรอกจำนวนเงินแล้วกด **Generate QR** ระบบจะสร้าง QR Code ให้ทันที พร้อมตัวเลือกดาวน์โหลด PNG เพื่อใช้งานง่าย เหมาะสำหรับรับหรือจ่ายเงินอย่างรวดเร็ว

## 🛠 Tech Stack
- **Frontend:** React + Tailwind CSS
- **Backend:** Express + promptpay-qr + qrcode
- **API:** สร้าง QR Code จากจำนวนเงินที่ผู้ใช้กรอก

## ⚡ Features
- กรอกจำนวนเงินแล้วสร้าง QR Code อัตโนมัติ
- ดาวน์โหลด QR Code เป็นไฟล์ PNG
- ป้องกันการกรอกตัวอักษร (รับเฉพาะตัวเลข)
- รองรับ Desktop และ Mobile

## 🚀 Installation

### Backend
```bash
cd backend
npm install
node server.js
