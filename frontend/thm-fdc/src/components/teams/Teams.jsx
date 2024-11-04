import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";
import AppFooter from '../footer/AppFooter';
import Dashboard from './Dashboard'
import ProductCTA from './ProductCTA';
import Cards from './Cards';
import Matches from './Matches';
import Table from './Table'
import OrdersTable from './components/OrdersTable'
import Player from './Player'
import { useParams } from 'react-router-dom';


function Teams() {

  const { id } = useParams();

  return (
    <div>

      <Header/>
      <ProductCTA id={id}/>
      <Table id={id}/>
      <Player id={id}/>
      <AppFooter />
      
    </div>
  );
}

export default Teams;