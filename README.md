# 🦄 UnicornX OS

> บันทึกแนวคิด, โครงสร้าง, งาน และความคืบหน้าสำหรับทีม dev / content / creator by billlzzz10  
> [🔗 UnicornX-OS Notion Dashboard (เฉพาะทีม)](https://www.notion.so/UnicornX-OS-2205e81a91ff8015a7a9db9a312771e9)

---

## 🟦 สรุปเทคโนโลยีที่ใช้

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js (Express)
- **Database:** PostgreSQL
- **Cloud & DevOps:** Google Cloud, Docker, GitHub Actions
- **AI Integration:** GPT-4o, Gemini, Claude (ผ่าน custom runner class)
- **Doc:** Notion, Markdown

---

## 📦 โครงสร้างรีโป (Repo Structure)

```
UnicornX/
├─ packages/          # source frontend/backend
├─ docs/              # อาร์ต โลโก้ เอกสาร นิยาย ฯลฯ
├─ scripts/           # tools/dev script
├─ .github/           # workflows, templates
├─ docker-compose.yml
├─ package.json
└─ README.md
```

---

## 🗺️ Overview Diagram

```mermaid
graph TD
  FE[Frontend<br/>(React/TS)]-->|API|BE(Node.js/Express)
  BE-->|ORM|DB[(PostgreSQL)]
  BE-->|Runner|AI[AI Classes]
  subgraph APIs
    API1(Content)
    API2(Podcast)
    API3(Novel)
  end
  FE-->|REST|API1
  FE-->|REST|API2
  FE-->|REST|API3
  BE-->|handle|API1
  BE-->|handle|API2
  BE-->|handle|API3
  BE-->|Cloud|GC[Google Cloud]
```

---

## 📆 Timeline คร่าว ๆ

```mermaid
gantt
  dateFormat  YYYY-MM-DD
  title UnicornX Milestone
  section Set up
    Idea & Plan         :done,  des1, 2024-06-01,2024-06-10
    Infra & Notion      :done,  des2, 2024-06-05,2024-06-18
  section Develop
    FE Basic            :active,dev1, 2024-06-17,2024-07-05
    BE API Core         :        dev2, 2024-06-20,2024-07-10
    DB Schema           :        dev3, 2024-06-24,2024-07-08
    AI Integration      :        dev4, 2024-06-28,2024-07-15
  section Next Steps
    Dashboard           :        dash, 2024-07-06,2024-07-20
    Content Import      :        cont, 2024-07-10,2024-07-30
```

---

## 🧑‍💻 เชื่อมโยง AI กับ API (Runner Classes)

```mermaid
flowchart LR
  FE[Frontend] --> BE[Backend]
  BE --> API1[Content API]
  BE --> API2[Podcast API]
  BE --> API3[Novel API]
  BE -->|invoke| GPT4o[Runner: GPT-4o]
  BE -->|invoke| Gemini[Runner: Gemini]
  BE -->|invoke| Claude[Runner: Claude]
```

---

## ✅ Checklist งานที่เหลือ/สำคัญ
- [x] โครง repo, Infra เบื้องต้น
- [ ] สร้าง FE UI เบื้องต้น (React+Vite)
- [ ] API endpoint: content/podcast/novel
- [ ] Design schema PostgreSQL v1
- [ ] AI Runner integration
- [ ] นำเสนอ Dashboard ใน FE
- [ ] Sync ข้อมูล/บทความจาก Notion (optional)
- [ ] ระบบ Auth/Permission (Future)
- [ ] CI/CD ด้วย Github Actions
- [ ] Deploy บน Google Cloud (Beta)

---

## ℹ️ ข้อมูลอ้างอิงและภายในทีม
- 🗂️ [UnicornX-OS Notion Internal](https://www.notion.so/UnicornX-OS-2205e81a91ff8015a7a9db9a312771e9)

---

> **หมายเหตุ:** สำหรับใช้ภายในทีม UnicornX เท่านั้น  
> อัพเดตใด ๆ ให้แก้ไขตรงนี้และ Notion ให้ตรงกัน

```

---