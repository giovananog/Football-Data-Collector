import { React } from "react";
import Header from "../header/Header";
import AppFooter from '../footer/AppFooter';
import Dashboard from './Dashboard'
import Matches from './Matches';
import MatchHeader from './MatchHeader';

function Teams() {

  return (
    <div>

      <Header />
      <MatchHeader />
      <Matches />
      <Dashboard />
      <AppFooter />
      
    </div>
  );
}

export default Teams;