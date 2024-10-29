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
import Player from "./player/Player";
import Matches from "./matches/Matches";
import Match from "./match/Match";
import Referee from "./referee/Referee";
import Manager from "./manager/Manager";
import Stadium from "./stadium/Stadium";

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
          <Route path="/campeonatos/:id/jogadores/:a" element={<Player/>}></Route>
          <Route path="/juizes/:a" element={<Referee/>}></Route>
          <Route path="/tecnicos/:a" element={<Manager/>}></Route>
          <Route path="/estadios/:a" element={<Stadium/>}></Route>
          
        </Routes>

      </div>
    </Router>
  );
}

export default App;