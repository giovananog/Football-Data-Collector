import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";
import AppFooter from '../footer/AppFooter';
import Dashboard from './Dashboard'
import ProductCTA from './ProductCTA';
import Cards from './Cards';
import MaxWidthDialog from "./components/Dialog"
import DialogCard from "./components/DialogCard"
import { useParams } from 'react-router-dom';
import Tables from "./Tables";

function Team() {
  const { id } = useParams();


  return (
    <div>

      <Header />
      <ProductCTA id={id} />
      <Tables id={id}/>
      <AppFooter/>
    </div>
  );
}

export default Team;