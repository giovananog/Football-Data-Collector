import { React } from "react";
import Header from "../header/Header";
import AppFooter from '../footer/AppFooter';
import ProductCTA from './ProductCTA';
import { useParams } from 'react-router-dom';
import Tables from "./Tables";

function Team() {

  const { teamId } = useParams();

  return (
    <div>

      <Header />
      <ProductCTA teamId={teamId} />
      <Tables teamId={teamId}/>
      <AppFooter />
    </div>
  );
}

export default Team;