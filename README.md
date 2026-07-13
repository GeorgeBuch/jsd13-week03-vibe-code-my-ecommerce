# EVERYDAY STUDIO PRD

## 1. ภาพรวมสินค้า
EVERYDAY STUDIO คือเว็บขายเสื้อผ้าแฟชั่นสไตล์มินิมอลสำหรับนักเรียน นักศึกษา วัยทำงานตอนต้น และคนที่ชอบลุคเรียบง่ายใช้งานได้ทุกวัน โปรเจกต์นี้มีทั้งหน้าเว็บสำหรับลูกค้าและ API ที่เชื่อมกับ MongoDB

## 2. เป้าหมายของโปรดักต์
สร้างต้นแบบร้านค้าออนไลน์ที่ใช้งานได้จริงระดับพื้นฐาน โดยต้อง:
- แสดงสินค้าจาก MongoDB
- รองรับการล็อกอินด้วยอีเมลและรหัสผ่าน
- เก็บและอ่านข้อมูล `users`, `products`, `orders`
- แยกโครงสร้างเว็บกับ API ให้ชัดเจน

## 3. เกณฑ์ความสำเร็จ
โปรเจกต์นี้ถือว่าสำเร็จเมื่อ:
- หน้าเว็บโหลดได้โดยไม่มี error ฝั่ง frontend
- `GET /api/health` ตอบกลับ `ok: true`
- `GET /api/products` ดึงข้อมูลสินค้าจาก MongoDB database `test` ได้
- คำขอ login สามารถ query collection `users` ได้
- ข้อมูลตัวอย่างสามารถ seed เข้า `users`, `products`, `orders` ได้

## 4. กลุ่มผู้ใช้
### ผู้ใช้หลัก
- ลูกค้าที่เข้ามาดูสินค้าและล็อกอิน

### ผู้ใช้รอง
- แอดมินหรือผู้ดูแลระบบที่ต้องจัดการสินค้าและออเดอร์ในอนาคต

## 5. User Stories หลัก
- ในฐานะผู้เยี่ยมชม ฉันต้องการดูสินค้าตัวอย่างจากฐานข้อมูล
- ในฐานะลูกค้า ฉันต้องการล็อกอินด้วยอีเมลและรหัสผ่าน
- ในฐานะเจ้าของร้าน ฉันต้องการเก็บข้อมูลสินค้า ผู้ใช้ และออเดอร์ไว้ใน MongoDB
- ในฐานะนักพัฒนา ฉันต้องการโครงสร้างโปรเจกต์ที่แยก API กับเว็บออกจากกันชัดเจน

## 6. ขอบเขตงาน
### อยู่ในขอบเขต
- หน้า landing page ฝั่งเว็บ
- ฟอร์มล็อกอิน
- รายการสินค้าดึงจาก MongoDB
- API สำหรับ health check, users, products, orders
- seed script สำหรับข้อมูลตัวอย่าง
- การแยกโฟลเดอร์สำหรับ API และ web

### อยู่นอกขอบเขต
- ระบบชำระเงิน
- ระบบขนส่ง
- ตะกร้าสินค้าแบบถาวร
- หน้า admin dashboard
- ระบบ token หรือ session สำหรับยืนยันตัวตน
- หน้าค้นหา/กรองสินค้าเพิ่มเติมจาก prototype ปัจจุบัน

## 7. Functional Requirements
### 7.1 เว็บแอป
- แสดง hero section และ branding ของร้าน
- แสดงการ์ดสินค้าจาก `/api/products`
- แสดงข้อความผลลัพธ์เมื่อ login สำเร็จหรือไม่สำเร็จ
- แสดงข้อความ fallback เมื่อโหลดสินค้าจาก backend ไม่ได้

### 7.2 API
- เชื่อม MongoDB ด้วย `MONGODB_URI`
- เปิด `GET /api/health`
- เปิด `GET /api/users`
- เปิด `GET /api/products`
- เปิด `GET /api/orders`
- serve frontend จาก `apps/web`

### 7.3 ฐานข้อมูล
- ใช้ database ชื่อ `test`
- มี collection:
  - `users`
  - `products`
  - `orders`
- รองรับข้อมูลตัวอย่างที่มี ObjectId คงที่เพื่อให้ reference ตรงกัน

## 8. โครงสร้างข้อมูล
### users
- `fullname`
- `email`
- `password`
- `role`

### products
- `name`
- `category`
- `price`
- `stock`

### orders
- `userId`
- `items[]`
- `totalPrice`
- `status`

### โครงสร้าง item ใน order
- `productId`
- `productName`
- `quantity`
- `price`

## 9. API Contract
### GET /api/health
ตัวอย่าง response:
```json
{ "ok": true, "database": "test" }
```

### GET /api/products
คืนค่าเป็น array ของ document สินค้าจาก MongoDB

### GET /api/users
คืนค่าเป็น array ของ document ผู้ใช้จาก MongoDB

### GET /api/orders
คืนค่าเป็น array ของ document คำสั่งซื้อจาก MongoDB

### POST /api/login
Request:
```json
{ "email": "...", "password": "..." }
```
Response:
- สำเร็จ: ข้อมูลสรุปผู้ใช้
- ไม่สำเร็จ: ข้อความ error หรือ validation

## 10. สถาปัตยกรรมระบบ
### Frontend
- HTML
- CSS
- Vanilla JavaScript

### Backend
- Node.js
- Express
- Mongoose

### โครงสร้างโฟลเดอร์
- `apps/web` สำหรับหน้าเว็บ
- `apps/api` สำหรับ backend, env, seed และ server code

## 11. โครงไฟล์ปัจจุบัน
### `apps/web`
- `index.html`
- `script.js`
- `style.css`

### `apps/api`
- `.env`
- `.env.example`
- `db.js`
- `server.js`
- `seed.js`
- `package.json`
- `package-lock.json`

## 12. วิธีใช้งาน
### ติดตั้ง dependencies
```bash
cd apps/api
npm install
```

### ใส่ข้อมูลตัวอย่างลงฐานข้อมูล
```bash
npm run seed
```

### รันเซิร์ฟเวอร์
```bash
npm start
```

## 13. ข้อกำหนดที่ไม่ใช่ฟังก์ชัน
- ต้องเริ่มรันได้เร็วในเครื่อง local
- โค้ดต้องอ่านง่าย
- ไม่พึ่งพาระบบ auth ภายนอก
- ใช้ได้กับ MongoDB Atlas หรือ MongoDB ที่เข้ากันได้
- หน้าเว็บควรแสดงข้อความ fallback เมื่อ API ใช้งานไม่ได้

## 14. Checklist การยอมรับงาน
- [ ] API server เริ่มทำงานจาก `apps/api`
- [ ] `GET /api/health` ทำงานได้
- [ ] `GET /api/products` คืนค่าข้อมูลสินค้าที่ seed ไว้
- [ ] หน้าเว็บ render สินค้าจาก API ได้
- [ ] ฟอร์มล็อกอินส่ง request ไป backend ได้
- [ ] seed script ทำงานสำเร็จโดยไม่มี error
- [ ] โครงโปรเจกต์แยกเป็น `apps/api` และ `apps/web`

## 15. หมายเหตุ
- README เดิมแบบวิเคราะห์โปรเจกต์ได้ถูกแทนที่ด้วย PRD ฉบับนี้
- การเชื่อม MongoDB ปัจจุบันชี้ไปที่ database `test`
- ข้อมูลตัวอย่างใช้ ObjectId คงที่เพื่อให้ความสัมพันธ์ระหว่าง users, products และ orders ตรงกัน
