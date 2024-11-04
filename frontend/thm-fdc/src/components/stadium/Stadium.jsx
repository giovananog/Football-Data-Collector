import { React } from "react";
import Header from "../header/Header";
import AppFooter from '../footer/AppFooter';
import ProductCTA from './ProductCTA';
import StadiumInfo from "./components/StadiumInfo";
import ContactInfo from "./components/ContactInfo";
import { useParams } from 'react-router-dom';


function Team() {

  const { id } = useParams();

  return (
    <div>

      <Header />
      <ProductCTA id={id}/>
      <StadiumInfo id={id}/>
      <ContactInfo id={id}/>
      <AppFooter />
    </div>
  );
}

export default Team;