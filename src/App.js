import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import LobbyView from "./components/LobbyView";
import Splash from "./components/Splash";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/lobby" element={<LobbyView />} />
            </Routes>
        </Router>
    );
}

export default App;
