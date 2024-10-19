import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";
import AppFooter from '../footer/AppFooter';
import Dashboard from './Dashboard'
import Statistic from "./Statistics";

function Matches() {

  return (
    <div>

      <Header />
      <Dashboard />
      <Statistic />
      <AppFooter />
      
    </div>
  );
}

export default Matches;