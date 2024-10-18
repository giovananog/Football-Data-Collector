import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";
import AppFooter from '../footer/AppFooter';

function General(props) {

  return (
    <div className="home-div">

      <Header />
      <AppFooter />

    </div>
  );
}

export default General;