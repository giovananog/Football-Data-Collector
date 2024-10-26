import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

import 'typeface-poppins';
import Home from "./home/Home";
import Teams from "./teams/Teams";
import Team from "./team/Team";
import Matches from "./matches/Matches";
import Match from "./match/Match";

function App() {
  return (
    <Router>
      <div>
        <Routes>

          <Route path="/" element={<Home/>}></Route>
          <Route path="/campeonatos/:times" element={<Teams/>}></Route>
          <Route path="/campeonatos/:times/:time" element={<Team/>}></Route>
          <Route path="/campeonatos/:id/partidas" element={<Matches/>}></Route>
          <Route path="/campeonatos/:id/partidas/:id" element={<Match/>}></Route>
          
        </Routes>

      </div>
    </Router>
  );
}

export default App;