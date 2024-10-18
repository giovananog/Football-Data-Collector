import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";
import ProductHero from './views/ProductHero';
import ProductValues from './views/ProductValues';

function Home(props) {

  return (
    <div className="home-div">

      <Header />
      <ProductHero />
      <ProductValues />

    </div>
  );
}

export default Home;