import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";
import AppFooter from '../footer/AppFooter';
import Dashboard from './Dashboard'
import ProductCTA from './ProductCTA';
import Cards from './Cards';

function Team() {

  return (
    <div>

      <Header />
      <ProductCTA />
      {/* <Cards />
      <Dashboard /> */}
      <AppFooter />
      
    </div>
  );
}

export default Team;