import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

import 'typeface-poppins';
import Home from "./home/Home";

function App() {
  return (
    <Router>
      <div>
        <Routes>

          <Route path="/" element={<Home/>}></Route>
          
        </Routes>

      </div>
    </Router>
  );
}

export default App;