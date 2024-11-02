import { React } from "react";
import Header from "../header/Header";
import AppFooter from '../footer/AppFooter';
import ProductCTA from './ProductCTA';
import StadiumInfo from "./components/StadiumInfo";
import ContactInfo from "./components/ContactInfo";

function Team() {

  return (
    <div>

      <Header />
      <ProductCTA />
      <StadiumInfo />
      <ContactInfo />
      <AppFooter />
    </div>
  );
}

export default Team;