import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";
import ProductHero from './views/ProductHero';
import ProductValues from './views/ProductValues';
import ProductCategories from './views/ProductCategories';
import ProductSmokingHero from './views/ProductSmokingHero';
import AppFooter from '../footer/AppFooter';
import Dashboard from "./views/components/Dashboard";

function Home(props) {

  return (
    <div className="home-div">

      <Header />
      <ProductHero />
      <Dashboard />
      {/* <ProductValues /> */}
      <ProductCategories />
      <ProductSmokingHero />
      <AppFooter />

    </div>
  );
}

export default Home;