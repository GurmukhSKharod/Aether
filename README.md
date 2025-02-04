## **🌌 Aether – Real Space Exploration Game**  
Aether is a **real-time space exploration game** that dynamically displays celestial bodies using **real NASA data**. Built with **React**, it lets players **navigate space, click planets to collect them, and track scores in a real NASA-generated universe**.

The frontend server is hosted via Netlify. Check out the app here: https://aether-exploration.netlify.app/  

The backend server is hosted remotely via Render.com: https://render.com/  
The Database server is hosted via supabase: https://supabase.com/  
 
---

### **🚀 Tech Stack**  
### **Frontend**  
![React.js](https://img.shields.io/badge/React.js-61DAFB?style=for-the-badge&logo=react&logoColor=white)     **React.js**: Used to build the web-based game interface, rendering the UI components dynamically.  
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) **JavaScript**: Core language for the frontend logic and game mechanics.  
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white) **CSS**: Custom styling and animations for HUD, player, planets, and intro messages.  


### **Backend**  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)     **Node.js**: Handles the server-side logic, including API endpoints.  
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)     **Express.js**: Provides RESTful API endpoints for fetching and storing celestial bodies.  
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)     **Supabase (PostgreSQL)**: Stores celestial data.

### **APIs Used** 
**NASA NEO API**: Retrieves real-time data on **near-Earth asteroids**, including size, mass, and distance from Earth.  

**NASA EPIC API**: Fetches **high-resolution Earth images** taken by the **Deep Space Climate Observatory (DSCOVR)**.  
 
**NASA Exoplanet Archive API**: Provides **exoplanet data**, including **mass, radius, and distance from their stars**. 

Check out the NASA API Page: 🌍 https://api.nasa.gov/
 

---

## **🌍 Features**  
✔ **Real NASA data** – Planets and names are from NASA APIs  
✔ **HUD Interface** – Displays score, player icon, and game title  
✔ **Player Movement** – Navigate using **Arrow Keys** or **W/A/S/D**  
✔ **Click to Collect Planets** – Click on planets to increase score  
✔ **Animations** – Score bounce effect, planet bounce, smooth transitions  

---

## **🛠 Setup & Installation**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/GurmukhSKharod/Aether.git
cd Aether
```

---

## ** Backend (Node.js + Supabase)**
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
PORT=5050
NASA_API_KEY=DEMO_KEY
```
Replace `DEMO_KEY` with your actual **NASA API key** from [https://api.nasa.gov](https://api.nasa.gov).

### **4️⃣ Fetch NASA Data & Start Backend**
```sh
node server.js
curl http://localhost:5050/api/fetch-nasa  # Fetch NASA data manually
```
Backend will now be running on **http://localhost:5050** 🚀

---

## ** Frontend (React)**
### **5️⃣ Install Dependencies**
```sh
cd ../frontend
npm install
```

### ** 6️⃣ Configure Environment Variables**
Create a `.env` file inside the **frontend/** folder:
```
REACT_APP_API_URL=http://localhost:5050
REACT_APP_SUPABASE_URL=https://your-supabase-url.supabase.co
REACT_APP_SUPABASE_KEY=your-anon-key
```

Note that the current backend runs on a remote server, 
so to **run this backend on a localhost server**, 
```
replace Line 3 in frontend > src > hooks > useCelestialData
```
from
```
const API_URL = process.env.REACT_APP_BACKEND_URL;
```
to
```
const API_URL = process.env.REACT_APP_API_URL;
```
assuming you have the **correct env setup** previously described in step 6 for the frontend.



### **7️⃣ Start the Frontend**
```sh
npm start
```
Frontend will be available at **http://localhost:3000** 🎮

---

## **🚀 OPTIONALLY: Creating an Optimized Production Build for Frontend**
By default, **React's development build is not optimized**. To generate a production-ready build, follow these steps:

### **Run the Production Build Command**
```sh
npm run build
npm install -g serve
serve -s build
```

Frontend will be available at **http://localhost:3000** 🎮

---

**Enjoy exploring space in Aether! 🌌✨**
