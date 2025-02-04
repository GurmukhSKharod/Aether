import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SpaceMap from "./pages/SpaceMap";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SpaceMap />} />
            </Routes>
        </Router>
    );
}

export default App;
