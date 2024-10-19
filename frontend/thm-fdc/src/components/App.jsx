import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

import 'typeface-poppins';
import Home from "./home/Home";
import General from "./general/General";

function App() {
  return (
    <Router>
      <div>
        <Routes>

          <Route path="/" element={<Home/>}></Route>
          <Route path="/geral" element={<General/>}></Route>
          
        </Routes>

      </div>
    </Router>
  );
}

export default App;