import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";
import AppFooter from '../footer/AppFooter';
import Dashboard from './Dashboard'
import ProductCTA from './ProductCTA';
import Cards from './Cards';
import MaxWidthDialog from "./components/Dialog"
import DialogCard from "./components/DialogCard"
import Tables from "./Tables";

function Team() {

  return (
    <div>

      <Header />
      <ProductCTA />
      <Tables />
      {/* <Dashboard />
      <Cards /> */}
      <AppFooter />
    </div>
  );
}

export default Team;