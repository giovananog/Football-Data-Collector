import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";
import ProductHero from './views/ProductHero';
import ProductValues from './views/ProductValues';
import ProductCategories from './views/ProductCategories';
import ProductSmokingHero from './views/ProductSmokingHero';
import AppFooter from '../footer/AppFooter';
import Dashboard from "./views/components/Dashboard";
import Tables from "./views/components/Tables";

function Home(props) {

  return (
    <div className="home-div">

      <Header />
      <ProductHero />
      <Dashboard />
      <ProductCategories />
      <Tables />
      <ProductSmokingHero />
      <AppFooter />

    </div>
  );
}

export default Home;