## **🌌 Aether – Real Space Exploration Game**  
Aether is a **real-time multiplayer space exploration game** that dynamically updates celestial bodies using **real NASA API data**. Built with **React, Three.js, and WebSockets**, it lets players **travel, claim planets, and mine resources in a real NASA-generated universe**.

### **🚀 Tech Stack**
- **Frontend:** React.js, Three.js (3D rendering), Zustand (state management)
- **Backend:** Node.js (Express.js), Supabase (PostgreSQL), WebSockets (real-time multiplayer)
- **Database:** Supabase (hosted PostgreSQL)
- **APIs Used:** NASA Open APIs (Exoplanets, Asteroids, Solar System Bodies)
- **Hosting:** Vercel (frontend), Render (backend)

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
