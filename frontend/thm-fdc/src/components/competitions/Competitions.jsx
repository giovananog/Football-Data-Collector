import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";
import AppFooter from '../footer/AppFooter';
import Dashboard from './Dashboard'

function Competitions() {

  return (
    <div>

      <Header />
      <Dashboard />
      <AppFooter />
      
    </div>
  );
}

export default Competitions;