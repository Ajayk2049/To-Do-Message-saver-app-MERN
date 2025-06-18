# 📝 MERN Message Saver App

A full-stack message-saving and to-do-style app built with the MERN stack. Users can securely sign up, log in, and manage personal notes/messages with real-time CRUD capabilities. Supports message pinning, editing, and per-user privacy.

---

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
</div>

---

## 🖼️ Screenshots


### 🔐 Auth Page

![Signup Page](./frontend/public/screenshots/signup.png)

### 💬 Message Manager

![Message Saver](./frontend/public/screenshots/messages.png)

> To add your own screenshots, place `.png` or `.jpg` files in `frontend/public/screenshots/`  
> Use relative paths like `![Label](./frontend/public/screenshots/filename.png)`

---

## 🚀 Tech Stack

### Frontend (React)
- **Vite** – for lightning-fast dev environment
- **React Router DOM** – for page navigation
- **Tailwind CSS** – for modern responsive UI
- **React Hooks** – `useState`, `useEffect`, `useNavigate`

### Backend (Node.js + Express)
- **Express.js** – REST API routes
- **cors** – Enable cross-origin requests
- **dotenv** – Securely store env vars
- **bcrypt** – Password hashing
- **jsonwebtoken (JWT)** – Token-based auth
- **mongoose** – MongoDB ODM

### Database
- **MongoDB Atlas** – Cloud-hosted MongoDB
- **Mongoose schema validations**
- **MongoDB _id** used as unique message ID

---

## 🔐 Features

### ✅ User Authentication
- Signup with validation for name, email, password, and DOB
- Login with JWT-based session management
- Passwords stored securely using bcrypt
- Logged-in state persisted using localStorage

### ✅ Message Management
- Add new messages with one click or Enter key
- Edit messages inline
- Delete individual messages with confirmation
- Delete all messages in one click

### 📌 Pin System
- Pin/unpin important messages
- Limit of 3 pinned messages per user
- Pinned messages always shown at the top

### 🔒 Per-User Privacy
- Each user has their own saved messages
- Only authenticated users can access their data
- Backend validates all actions using token middleware

---

## 📦 Project Structure

message-saver/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ ├── server.js
├── frontend/
│ ├── src/
│ │ ├── Pages/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ ├── public/screenshots/
├── README.md
├── .env.example


---

## 📥 How to Use This Project

### 🔧 Clone & Setup

```bash
git clone https://github.com/yourusername/message-saver.git
cd message-saver
cd backend
npm install
Create a .env file in backend/ with the following:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Start the backend:
node server.js
🧩 Frontend Setup:
cd frontend
npm install
npm run dev
Then visit:
http://localhost:5173
example test-user:
{
  "email": "ajay@example.com",
  "password": "ajay123"
}
```

🧠 Future Enhancements (Ideas)

 Dark mode toggle
 Drag-and-drop message reordering
 Message tags and filtering
 Upload file attachments per message

📄 License

MIT – free to use and modify.

