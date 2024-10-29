import { React } from "react";
import Header from "../header/Header";
import AppFooter from '../footer/AppFooter';
import ProductCTA from './ProductCTA';
import Tables from "./Tables";

function Team() {

  return (
    <div>

      <Header />
      <ProductCTA />
      <Tables />
      <AppFooter />
    </div>
  );
}

export default Team;