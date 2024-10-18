import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";
import ProductHero from './views/ProductHero';
import ProductValues from './views/ProductValues';
import ProductCategories from './views/ProductCategories';

function Home(props) {

  return (
    <div className="home-div">

      <Header />
      <ProductHero />
      <ProductValues />
      <ProductCategories />

    </div>
  );
}

export default Home;