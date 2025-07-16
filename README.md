# 🍬 Sweet Shop Frontend

A responsive and modern frontend application for managing sweets inventory — built with **React** and **Tailwind CSS**.

> 🔗 Live Demo (optional): [Add link here after deployment]

---

## ✨ Features

- 📋 View all sweets in a card layout
- ➕ Add new sweets
- ✏️ Edit existing sweets
- 🗑️ Delete sweets
- 🛒 Purchase sweets (reduce quantity)
- 📦 Restock sweets (increase quantity)
- 🔍 Search sweets by name, category
- 🔃 Sort by price or quantity (asc/desc)
- ⌨️ `Ctrl + K` to instantly focus on the search input
- ✅ Toast notifications for actions
- 💅 Clean Tailwind UI

---

## 📁 Folder Structure

src/
├── api/ # Axios API service functions
├── components/ # Reusable UI components (Navbar, SweetCard, SearchBar, etc.)
├── pages/ # Page components (Home, EditSweet, PurchaseSweet, RestockSweet,DeleteSweet)
├── App.js # Main application routes
└── index.js # React entry point



---

## 🛠️ Tech Stack

- ⚛️ React
- 💨 Tailwind CSS
- 📦 Axios
- 🔀 React Router DOM
- 🌐 RESTful API (Connected to Express backend)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/GAUTA00/Sweet-shop-frontend.git
cd Sweet-shop-frontend

### 2. Install dependencies
npm install

### 3. Start development server
npm start

Runs on: http://localhost:3000

⚠️ Make sure your backend is running at http://localhost:8080

🔗 API Endpoints
This frontend connects to the following backend routes:

GET     /api/v1/getSweets
POST    /api/v1/addSweets
PUT     /api/v1/updateSweet/:id
DELETE  /api/v1/deleteSweet/:id
PUT     /api/v1/purchaseSweet/:id
PUT     /api/v1/restockSweet/:id
GET     /api/v1/searchSweets?name=&category=&sortBy=price&order=asc



👨‍💻 Author
Gautam Prajapati
GitHub: @GAUTA00

📃 License
This project is open source and available under the MIT License.