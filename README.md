## **🌌 Aether – Real Space Exploration Game**  
Aether is a **real-time multiplayer space exploration game** that dynamically updates celestial bodies using **real NASA API data**. Built with **React, Three.js, and WebSockets**, it lets players **travel, claim planets, and mine resources in a real NASA-generated universe**.

### **🚀 Tech Stack**
- **Frontend:**
![React.js] - https://img.shields.io/badge/React.js-61DAFB?style=for-the-badge&logo=react&logoColor=white
![Three.js] - https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white
![Zustand] - https://img.shields.io/badge/Zustand-FF9900?style=for-the-badge&logo=zustand&logoColor=white
![React Router] - https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
![Axios] - https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white

- **Backend:**
![Node.js] - https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
![Express.js] - https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
![Supabase] - https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white
![WebSockets] - https://img.shields.io/badge/WebSockets-FF4500?style=for-the-badge&logo=websocket&logoColor=white

- **APIs Used:**
![NASA API] - https://img.shields.io/badge/NASA_API-4285F4?style=for-the-badge&logo=nasa&logoColor=white
![Solar System API] - https://img.shields.io/badge/Solar_System_API-FFD700?style=for-the-badge&logo=space&logoColor=white
![Asteroid NEO API] - https://img.shields.io/badge/Asteroid_NEO_API-FF5733?style=for-the-badge&logo=meteor&logoColor=white
  
---

## **🌍 Features**
✔ **Real-time NASA data** – Celestial bodies update daily from NASA APIs  
✔ **3D Space Exploration** – Built using Three.js  
✔ **Multiplayer Support** – WebSockets allow players to see each other in space  
✔ **Claim Celestial Bodies** – Players can explore and claim planets  

---

## **🛠 Setup & Installation**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/GurmukhSKharod/Aether.git
cd Aether
```

---

## **🌍 Backend (Node.js + Supabase)**
### **2️⃣ Install Dependencies**
```sh
cd backend
npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file inside the **backend/** folder:
```
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_KEY=your-anon-key
DATABASE_URL=your-postgres-connection-url
PORT=5000
NASA_API_KEY=DEMO_KEY
```
Replace `DEMO_KEY` with your actual **NASA API key** from [https://api.nasa.gov](https://api.nasa.gov).

### **4️⃣ Fetch NASA Data & Start Backend**
```sh
node server.js
curl http://localhost:5000/api/fetch-nasa  # Fetch NASA data manually
```
Backend will now be running on **http://localhost:5000** 🚀

---

## **🖥 Frontend (React + Three.js)**
### **5️⃣ Install Dependencies**
```sh
cd ../frontend
npm install
```

### **6️⃣ Start the Frontend**
```sh
npm start
```
Frontend will be available at **http://localhost:3000** 🎮

---

## **🛰 API Endpoints**
### **Fetch Celestial Bodies**
**GET /api/celestial**  
Returns all planets, asteroids, and exoplanets from Supabase.

### **Fetch NASA Data (Manual Update)**
**GET /api/fetch-nasa**  
Fetches the latest NASA API data and stores it in the database.

---


**Enjoy exploring real space in Aether! 🌌✨**
