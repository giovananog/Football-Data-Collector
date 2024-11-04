import { React } from "react";
import Header from "../header/Header";
import AppFooter from '../footer/AppFooter';
import Dashboard from './Dashboard'
import Matches from './Matches';
import MatchHeader from './MatchHeader';
import { useParams } from 'react-router-dom';


function Teams() {

  const { season } = useParams();
  const { matchId } = useParams();


  return (
    <div>

      <Header />
      <MatchHeader season={season} matchId={matchId} />
      <Matches season={season} matchId={matchId}/>
      <AppFooter />
      
    </div>
  );
}

export default Teams;