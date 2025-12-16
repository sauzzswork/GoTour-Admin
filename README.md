# ✈️ GoTour – Admin Dashboard

GoTour is a full-stack tour management admin dashboard that allows admins to manage tours through a secure login system.  
The project is built using **React**, **Node.js**, **Express**, and **MongoDB**, with cloud deployment on **Vercel** and **Render**.

---

## 🔗 Live URLs

- **Frontend (Admin Dashboard)**  
  👉 https://go-tour-admin-frontend-q0tgvsb1a-saurav-mishras-projects.vercel.app

- **🔐 Admin Login Credentials (Test User)**
- Email: admin@tripzsearch.com
- Password: Admin@123
---

> These credentials are provided for testing purposes only.

---

- **Backend API Base URL**  
 👉 https://gotour-admin.onrender.com/api/health

- **GitHub Repository**  
  👉 https://github.com/sauzzswork/GoTour-Admin  


---

## 🧑‍💻 Tech Stack

### Frontend
- React (Create React App)
- React Router DOM
- Axios
- HTML CSS
- Hosted on **Vercel**

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- CORS
- Hosted on **Render**

### Database
- MongoDB Atlas



## 🚀 How to Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/sauzzswork/GoTour-Admin.git
cd Gotour-Admin
```

### 2️⃣ Backend Setup
```bash
cd apps/backend
npm install
```

### Create a .env file inside apps/backend
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
### Run Backend
```bash
npm run dev
```
### 3️⃣ Frontend Setup
```bash
cd apps/frontend
npm install
```
### Create a .env file inside apps/frontend
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

### Run Frontend
```bash
npm start
```

