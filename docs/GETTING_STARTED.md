# UnicornX OS: คู่มือเริ่มต้นใช้งาน

ยินดีต้อนรับสู่ UnicornX OS! คู่มือนี้จะช่วยให้คุณเริ่มต้นใช้งานโปรเจกต์ได้อย่างรวดเร็ว

## สารบัญ

- [การเริ่มต้นโปรเจกต์ UnicornX OS](#การเริ่มต้นโปรเจกต์-unicornx-os)
  - [ขั้นตอนการติดตั้งและเรียกใช้งาน](#ขั้นตอนการติดตั้งและเรียกใช้งาน)
    - [1. Prerequisites](#1-prerequisites)
    - [2. การติดตั้ง](#2-การติดตั้ง)
    - [3. การตั้งค่า Environment Variables](#3-การตั้งค่า-environment-variables)
    - [4. การเรียกใช้งาน](#4-การเรียกใช้งาน)
      - [แบบ Development (แยกคำสั่ง)](#แบบ-development-แยกคำสั่ง)
      - [แบบ Docker (แนะนำ)](#แบบ-docker-แนะนำ)
    - [5. การเข้าถึง](#5-การเข้าถึง)
  - [โครงสร้างโปรเจกต์](#โครงสร้างโปรเจกต์)
  - [Phase 0 Checklist](#phase-0-checklist)
  - [ขั้นตอนถัดไป](#ขั้นตอนถัดไป)
# การเริ่มต้นโปรเจกต์ UnicornX OS

## ขั้นตอนการติดตั้งและเรียกใช้งาน

### 1. Prerequisites

ตรวจสอบให้แน่ใจว่าคุณมีซอฟต์แวร์เหล่านี้ติดตั้งแล้ว:

- **Node.js** (v18 หรือสูงกว่า)
- **Python** (v3.9 หรือสูงกว่า)
- **PostgreSQL** (v13 หรือสูงกว่า)
- **Redis** (v6 หรือสูงกว่า)
- **Git**

### 2. การติดตั้ง

```bash
# Clone repository
git clone <repository-url>
cd UnicornX

# ติดตั้ง dependencies สำหรับ Frontend
cd packages/client
npm install

# กลับไปที่ root และติดตั้ง Python dependencies
cd ../../packages/server
pip install -r requirements.txt

# สร้าง environment file
cd ../../
cp .env.example .env
```

### 3. การตั้งค่า Environment Variables

แก้ไขไฟล์ `.env` และใส่ค่าที่เหมาะสม:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/unicornx_db
OPENAI_API_KEY=your_openai_api_key_here
# ... และค่าอื่น ๆ
```

### 4. การเรียกใช้งาน

#### แบบ Development (แยกคำสั่ง)

```bash
# Terminal 1: เรียกใช้ Backend
cd packages/server
python main.py

# Terminal 2: เรียกใช้ Frontend
cd packages/client
npm run dev
```

#### แบบ Docker (แนะนำ)

```bash
# เรียกใช้ทั้งระบบด้วย Docker
docker-compose up --build
```

### 5. การเข้าถึง

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## โครงสร้างโปรเจกต์

```
UnicornX/
├── packages/
│   ├── client/          # Next.js Frontend
│   ├── server/          # FastAPI Backend
│   └── shared/          # Shared types and utilities
├── docs/                # Documentation
├── docker-compose.yml   # Docker configuration
└── README.md           # Project overview
```

## Phase 0 Checklist

- [x] โครงสร้างโปรเจกต์
- [x] Next.js Frontend setup
- [x] FastAPI Backend setup
- [x] Docker configuration
- [ ] Database schema design
- [ ] Basic authentication
- [ ] First API endpoints
- [ ] Basic UI components

## ขั้นตอนถัดไป

1. **Database Schema Design**: ออกแบบโครงสร้างฐานข้อมูลสำหรับ 4 โมดูลหลัก
2. **Authentication System**: ระบบ login/register
3. **Basic Task Management**: เริ่มพัฒนา Catalyst System พื้นฐาน
