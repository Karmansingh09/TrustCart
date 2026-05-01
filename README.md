# 🛒 TrustCart – Smart & Secure E-commerce Platform

TrustCart is an innovative e-commerce platform that helps users make **safe and smart purchasing decisions** using a **Trust Score system**. The goal is to reduce fake product risk, highlight reliable sellers, and give customers clearer signals before they buy.

---

## 🚀 Overview

TrustCart combines a modern shopping experience with product verification logic. Each product can be evaluated using seller reputation, pricing behavior, review activity, and product history to generate a visible trust badge for buyers.

The current repository contains the React frontend prototype. Backend, database, admin dashboard, and trust score engine modules are part of the planned platform architecture.

---

## 🎯 Problem

Online marketplaces often contain:

- Fake products ❌
- Misleading sellers ❌
- Unreliable reviews ❌
- Suspicious pricing ❌
- Low transparency for buyers ❌

---

## 💡 Solution

TrustCart introduces a **Trust Score Algorithm** that evaluates products based on:

- Seller rating
- Price anomaly
- Review count
- Product history
- Customer feedback patterns

The final score is shown as a simple trust badge so users can quickly understand whether a product looks safe, risky, or suspicious.

---

## 🏗️ System Architecture

![TrustCart system architecture diagram](docs/diagrams/system-architecture.svg)

---

## 🔁 User Journey Flow

![TrustCart user journey flow diagram](docs/diagrams/user-journey.svg)

---

## 🧠 Trust Score Logic

![TrustCart trust score logic diagram](docs/diagrams/trust-score-logic.svg)

---

## 📊 Trust Score Weight Chart

![TrustCart trust score weight chart](docs/diagrams/trust-score-weight-chart.svg)

### Example Score Levels

| Trust Score | Badge | Meaning |
| --- | --- | --- |
| 80 - 100 | 🟢 Trusted | Product looks reliable |
| 50 - 79 | 🟡 Caution | Product needs review before buying |
| 0 - 49 | 🔴 Risky | Product may be fake or suspicious |

---

## 💬 Chat & Support Flow

![TrustCart chat and support flow diagram](docs/diagrams/chat-support-flow.svg)

---

## 🗃️ Database Relationship Diagram

![TrustCart database relationship diagram](docs/diagrams/database-er.svg)

---

## ⚙️ Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React.js |
| Backend | Node.js + Express |
| Database | MongoDB |
| Styling | CSS |
| Testing | Testing Library |

---

## 🔥 Features

- 🛍️ Product listing
- 🛒 Cart system
- 🛡️ Fake product detection using Trust Score
- 🤖 Smart recommendations
- 📊 Admin dashboard
- 💬 Customer support chat
- 🏷️ Trust badges for products
- ⭐ Review and seller rating analysis

---

## 📂 Project Structure

```bash
TrustCart/
├── client/        # Frontend (React)
├── server/        # Backend (Node.js + Express) - planned
├── README.md
└── .gitignore
```

Current implementation:

```bash
client/
├── public/
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── package-lock.json
```

---

## 🧪 Run Locally

```bash
cd client
npm install
npm start
```

The frontend runs at:

```text
http://localhost:3000
```

---

## 📌 Status

🚧 In Development

Current progress:

- React frontend prototype created
- Product card UI added
- TrustCart platform architecture planned
- Backend and database modules pending

---

## 👨‍💻 Author

**Karman Singh Chandhok**
