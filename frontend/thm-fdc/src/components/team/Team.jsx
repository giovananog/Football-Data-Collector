import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";
import AppFooter from '../footer/AppFooter';
import Dashboard from './Dashboard'
import ProductCTA from './ProductCTA';
import Cards from './Cards';
import MaxWidthDialog from "./components/Dialog"
import DialogCard from "./components/DialogCard"

function Team() {

  return (
    <div>

      <Header />
      <ProductCTA />
      <Dashboard />
      <Cards />
      <AppFooter />
    </div>
  );
}

export default Team;