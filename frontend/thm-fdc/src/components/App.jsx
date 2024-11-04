import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

import 'typeface-poppins';
import Home from "./home/Home";
import Stadium from "./stadium/Stadium";
import Teams from "./teams/Teams";
import Team from "./team/Team";
import Matches from "./matches/Matches";
import Referee from "./referee/Referee";
import Match from "./match/Match";
import Player from "./player/Player";
import Manager from "./manager/Manager";

function App() {
  return (
    <Router>
      <div>
        <Routes>

          <Route path="/" element={<Home/>}></Route>
          <Route path="/juizes/:id" element={<Referee/>}></Route>
          <Route path="/tecnicos/:id" element={<Manager/>}></Route>
          <Route path="/campeonatos/:id" element={<Teams/>}></Route>
          <Route path="/time/:teamId" element={<Team/>}></Route>
          <Route path="/campeonatos/:season/partidas" element={<Matches/>}></Route>
          <Route path="/campeonatos/:season/partidas/:matchId" element={<Match/>}></Route>
          <Route path="/jogadores/:id" element={<Player/>}></Route>
          <Route path="/estadios/:id" element={<Stadium/>}></Route>
          
        </Routes>

      </div>
    </Router>
  );
}

export default App;