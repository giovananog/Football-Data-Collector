import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";
import ProductHero from './views/ProductHero';

function Home(props) {

  return (
    <div className="home-div">

      <Header/>
      <ProductHero/>

    </div>
  );
}

export default Home;