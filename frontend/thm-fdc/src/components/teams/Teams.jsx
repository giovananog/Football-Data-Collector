import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";
import AppFooter from '../footer/AppFooter';
import Dashboard from './Dashboard'
import ProductCTA from './ProductCTA';

function Teams() {

  return (
    <div>

      <Header />
      <ProductCTA />
      <Dashboard />
      <AppFooter />
      
    </div>
  );
}

export default Teams;