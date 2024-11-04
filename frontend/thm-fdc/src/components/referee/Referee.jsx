import { React } from "react";
import Header from "../header/Header";
import AppFooter from '../footer/AppFooter';
import ProductCTA from './ProductCTA';
import Tables from "./Tables";
import { useParams } from 'react-router-dom';

function Team() {

  const { id } = useParams();


  return (
    <div>

      <Header />
      <ProductCTA id={id}/>
      <Tables id={id} />
      <AppFooter />
    </div>
  );
}

export default Team;