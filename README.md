<div align="center">
  <img src="https://raw.githubusercontent.com/billlzzz10/UnicornX/main/docs/assets/logo/UnicornX-logo-title-dark.png" width="340" alt="UnicornX Logo"/>
  <br>
  <h1 style="color:#7c44c2;">UnicornX Platform</h1>
  <p style="color:#9E8AD7;font-size:1.2em;">
    ศูนย์รวมแรงบันดาลใจ เทคโนโลยี นิยาย และงานสร้างสรรค์ของ billlzzz10
  </p>
  <img src="https://img.shields.io/github/languages/top/billlzzz10/UnicornX?style=for-the-badge&color=7c44c2">
  <img src="https://img.shields.io/github/stars/billlzzz10/UnicornX?style=for-the-badge&color=ff80bf">
  <img src="https://img.shields.io/github/last-commit/billlzzz10/UnicornX?style=for-the-badge&color=48d1cc">
</div>

---

## 🚀 ลิงก์สำคัญและผลงาน

- 🪐 [UnicornX-OS (Notion Dashboard)](https://www.notion.so/UnicornX-OS-2205e81a91ff8015a7a9db9a312771e9)
- 📖 [นิยาย ROF (Read Only Fantasy)](https://www.notion.so/ROF-Story-00c7ea4e34e645cf8f4c9b719c5e9e3e)
- 🎙️ [Podcast ช่องสร้างแรงบันดาลใจ](https://www.notion.so/UnicornX-OS-2205e81a91ff8015a7a9db9a312771e9)

---

## 📊 Dashboard & Stats

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=billlzzz10&show_icons=true&theme=radical&hide=prs&icon_color=ff80bf&title_color=7c44c2&text_color=9E8AD7&bg_color=282c34" width="410">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=billlzzz10&layout=compact&theme=radical&title_color=7c44c2&text_color=9E8AD7&bg_color=282c34" width="330">
</p>

---

## 🪐 Project Timeline

```mermaid
gantt
  dateFormat  YYYY-MM-DD
  title UnicornX Project Timeline
  section การวางแผน
    Idea & Design         :done,    des1, 2024-06-01,2024-06-15
    Notion Dashboard      :done,    des2, 2024-06-10,2024-06-20
  section พัฒนา
    Frontend (React/TS)   :active,  dev1, 2024-06-20,2024-07-10
    Backend (Node.js)     :         dev2, 2024-06-25,2024-07-15
    API Integration       :         dev3, 2024-07-01,2024-07-20
    AI Core Runner        :         dev4, 2024-07-10,2024-07-25
  section ต่อยอด
    Podcast/Novel Publish :         pub1, 2024-07-25,2024-08-10
    Dashboard Analytics   :         pub2, 2024-07-28,2024-08-15
```
---

## 🧩 โมดูลเชื่อมโยงแพลตฟอร์ม-ดาต้าเบส-API
---
```mermaid
graph TD
  U[UnicornX Platform]:::platform
  FE[Frontend<br/>(React/TS)]:::frontend --> U
  BE[Backend<br/>(Node.js)]:::backend --> U
  DB[(Database<br/>PostgreSQL)]:::db --> BE

  AI[AI Runner Classes<br/>(GPT-4o, Gemini, Claude)]:::ai --> BE
  API1[Content API]:::api --> BE
  API2[Podcast API]:::api --> BE
  API3[Novel API]:::api --> BE

  FE --> API1
  FE --> API2
  FE --> API3

  classDef platform fill:#7c44c2,stroke:#fff,stroke-width:2px;
  classDef frontend fill:#48d1cc,stroke:#fff;
  classDef backend fill:#9E8AD7,stroke:#fff;
  classDef db fill:#ff80bf,stroke:#fff;
  classDef ai fill:#fcb900,stroke:#282c34;
  classDef api fill:#e75480,stroke:#fff;
```
---

## 🔗 การเชื่อมโยง API กับ AI Runner Classes
---
```mermaid
flowchart LR
  FE[Frontend] --> API[API Gateway]
  API -->|REST/GraphQL| BE[Backend]
  BE -->|invoke| AI1[GPT-4o Runner]
  BE -->|invoke| AI2[Gemini Runner]
  BE -->|invoke| AI3[Claude Runner]
  AI1 -->|ตอบกลับ| BE
  AI2 -->|ตอบกลับ| BE
  AI3 -->|ตอบกลับ| BE
  BE --> API --> FE
```
---

## 🗂️ โครงสร้างรีโป
---
<details>
<summary>คลิกเพื่อดูรายละเอียด</summary>

```
UnicornX/
├── packages/         # โค้ดหลัก (frontend/backend)
├── docs/             # เอกสาร, โลโก้, อาร์ตเวิร์ก, นิยาย
├── scripts/          # dev tools, automation
├── .github/          # GitHub Actions, templates
├── docker-compose.yml
├── package.json
├── README.md
...
</details>

---

## ⚡ GitHub Actions ตัวอย่าง (CI/CD)
---
```yaml
# .github/workflows/ci.yml
name: UnicornX CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm install
      - run: npm run build
      - run: npm test
```

---

## 🌈 Brand Style

| โทนสี      | Hex       | ตัวอย่าง           |
|:-----------|:---------:|:------------------:|
| Violet     | #7c44c2   | ![#7c44c2](https://via.placeholder.com/30/7c44c2/fff?text=+) |
| Blue       | #48d1cc   | ![#48d1cc](https://via.placeholder.com/30/48d1cc/fff?text=+) |
| Pink       | #ff80bf   | ![#ff80bf](https://via.placeholder.com/30/ff80bf/fff?text=+) |
| Gray       | #9E8AD7   | ![#9E8AD7](https://via.placeholder.com/30/9E8AD7/fff?text=+) |

---

<div align="center">
  <b>🌠 UnicornX: สะท้อนจักรวาลแห่งแรงบันดาลใจและเทคโนโลยี 🌠</b><br>
  <a href="https://www.notion.so/UnicornX-OS-2205e81a91ff8015a7a9db9a312771e9"><img src="https://img.shields.io/badge/Notion-UnicornX--OS-7c44c2?logo=notion&logoColor=fff&style=for-the-badge"></a>
</div>
```

---

