# UnicornX OS API Documentation

## สรุป API ที่สร้างไว้และการใช้งาน

### 📋 รายการ API Endpoints

#### 🔐 Authentication (`/api/v1/auth`)
- `POST /api/v1/auth/register` - สมัครสมาชิกใหม่
- `POST /api/v1/auth/login` - เข้าสู่ระบบ
- `GET /api/v1/auth/profile` - ดูข้อมูลโปรไฟล์
- `PUT /api/v1/auth/profile` - แก้ไขโปรไฟล์
- `POST /api/v1/auth/logout` - ออกจากระบบ

#### 📁 Projects (`/api/v1/projects`)
- `GET /api/v1/projects` - ดูรายการโปรเจกต์ทั้งหมด
- `POST /api/v1/projects` - สร้างโปรเจกต์ใหม่
- `GET /api/v1/projects/{id}` - ดูรายละเอียดโปรเจกต์
- `PUT /api/v1/projects/{id}` - แก้ไขโปรเจกต์
- `DELETE /api/v1/projects/{id}` - ลบโปรเจกต์ (archive)
- `GET /api/v1/projects/{id}/stats` - สถิติของโปรเจกต์

#### ✅ Tasks (`/api/v1/tasks`)
- `GET /api/v1/tasks` - ดูรายการงานทั้งหมด (รองรับ filter)
- `POST /api/v1/tasks` - สร้างงานใหม่
- `GET /api/v1/tasks/{id}` - ดูรายละเอียดงาน
- `PUT /api/v1/tasks/{id}` - แก้ไขงาน
- `DELETE /api/v1/tasks/{id}` - ลบงาน

#### 📊 Dashboard (`/api/v1/dashboard`)
- `GET /api/v1/dashboard/overview` - ภาพรวมสถิติ
- `GET /api/v1/dashboard/mind-biome` - ข้อมูล Mind-Biome
- `GET /api/v1/dashboard/trends` - แนวโน้มการทำงาน
- `GET /api/v1/dashboard/insights` - ข้อมูลเชิงลึกและคำแนะนำ
- `GET /api/v1/dashboard/weekly-stats` - สถิติรายสัปดาห์

### 🛠️ ระบบนำทางใน Frontend

#### Navigation Component Features:
- **Responsive Sidebar** - เมนูแบบ slide-in สำหรับมือถือ
- **Quick Search** - ค้นหางานและโปรเจกต์แบบรวดเร็ว
- **Context-Aware Navigation** - แสดงหน้าปัจจุบันชัดเจน
- **User Profile** - ข้อมูลผู้ใช้และเมนูการตั้งค่า

#### หน้าหลักที่มี Navigation:
1. **แดชบอร์ด** (`/dashboard`) - ภาพรวมและสถิติ
2. **โปรเจกต์** (`/projects`) - จัดการโปรเจกต์
3. **งาน** (`/tasks`) - ระบบ Catalyst และการจัดการงาน
4. **Mind-Biome** (`/mind-biome`) - ภาพจิตใจและพลังงาน
5. **วิเคราะห์** (`/analytics`) - รายงานและข้อมูลเชิงลึก
6. **ห้องทดลอง** (`/lab`) - ฟีเจอร์ทดลองใหม่

### 🎯 ฟีเจอร์หลักของ UnicornX OS

#### 1. Mind-Biome System
- **พลังงาน (Energy Level)** - วัดระดับพลังงานในการทำงาน
- **สมาธิ (Focus Score)** - ประเมินความสามารถในการมีสมาธิ
- **อารมณ์ (Mood Indicator)** - ติดตามสถานะอารมณ์ (focused/scattered/low_energy)
- **รูปแบบการทำงาน** - วิเคราะห์ช่วงเวลาที่มีประสิทธิภาพ

#### 2. Catalyst Task System  
- **Effort Points** - คะแนนความพยายาม (1-10)
- **Complexity Level** - ระดับความซับซ้อน (1-5)
- **Energy Requirements** - พลังงานที่ต้องใช้
- **Mood Matching** - จับคู่งานกับสถานะอารมณ์

#### 3. Project Management
- **Project Types** - หมวดหมู่โปรเจกต์ (writing, development, business, personal)
- **Color Schemes** - สีประจำโปรเจกต์สำหรับ Mind-Biome
- **Metadata** - ข้อมูลที่ยืดหยุ่นสำหรับแต่ละโปรเจกต์
- **Statistics** - สถิติความก้าวหน้าและผลิตภาพ

### 🔧 การติดตั้งและใช้งาน

#### Backend (FastAPI):
```bash
cd packages/server
pip install -r requirements.txt
python main_complete.py
```

#### Frontend (Next.js):
```bash
cd packages/client
npm install
npm run dev
```

#### Dependencies ที่สำคัญ:
**Backend:**
- `fastapi` - Web framework
- `sqlalchemy` - ORM สำหรับฐานข้อมูล
- `python-jose` - JWT authentication
- `passlib` - Password hashing
- `psycopg2-binary` - PostgreSQL adapter

**Frontend:**
- `next.js` - React framework
- `@heroicons/react` - Icons
- `@headlessui/react` - UI components
- `tailwindcss` - Styling

### 📈 แผนการพัฒนาต่อไป

#### Phase 1 (ปัจจุบัน):
- ✅ Basic API structure
- ✅ Authentication system
- ✅ Task management
- ✅ Dashboard overview
- ✅ Navigation system

#### Phase 2 (กำลังพัฒนา):
- 🔄 Mind-Biome visualization
- 🔄 Real-time data sync
- 🔄 Mobile responsive design
- 🔄 Database integration

#### Phase 3 (วางแผน):
- 📋 Skill-Tree system
- 📋 Runner Agents (AI assistants)
- 📋 Advanced analytics
- 📋 Collaboration features

### 🚀 การเริ่มต้นใช้งาน

1. **ติดตั้ง dependencies** ทั้ง frontend และ backend
2. **ตั้งค่าฐานข้อมูล** PostgreSQL
3. **เริ่ม backend server** ที่ port 8000
4. **เริ่ม frontend server** ที่ port 3000
5. **เปิดเบราว์เซอร์** ไปที่ `http://localhost:3000`

### 📱 Mobile-First Design

Navigation ได้รับการออกแบบให้:
- ใช้งานได้ดีบนมือถือและเดสก์ท็อป
- มี burger menu สำหรับหน้าจอเล็ก
- แสดงข้อมูลสำคัญในพื้นที่จำกัด
- รองรับ touch gestures

### 🎨 UI/UX Highlights

- **สีธีม** - Purple/Slate gradient ที่สื่อถึงความสร้างสรรค์
- **Typography** - Inter font สำหรับความชัดเจน
- **Icons** - Heroicons สำหรับความสอดคล้อง
- **Animations** - Smooth transitions และ hover effects
- **Accessibility** - ARIA labels และ keyboard navigation

นี่คือสรุปครบถ้วนของ API และระบบนำทางที่เราสร้างขึ้นสำหรับ UnicornX OS! 🦄✨
