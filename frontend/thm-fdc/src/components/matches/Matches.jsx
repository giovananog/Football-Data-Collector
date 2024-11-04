import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";
import AppFooter from '../footer/AppFooter';
import Dashboard from './Dashboard'
import { useParams } from 'react-router-dom';

function Matches() {

  const { season } = useParams();

  return (
    <div>

      <Header />
      <Dashboard season={season} />
      <AppFooter />
      
    </div>
  );
}

export default Matches;