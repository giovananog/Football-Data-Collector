import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";
import ProductHero from './views/ProductHero';
import ProductValues from './views/ProductValues';
import ProductCategories from './views/ProductCategories';
import ProductSmokingHero from './views/ProductSmokingHero';


function Home(props) {

  return (
    <div className="home-div">

      <Header />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductSmokingHero />

    </div>
  );
}

export default Home;