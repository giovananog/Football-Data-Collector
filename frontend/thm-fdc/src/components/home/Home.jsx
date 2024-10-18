import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";

function Home(props) {

  return (
    <div className="home-div" style={{backgroundColor: '#ccc'}}>
      <Header className="header" style={{ backgroundColor: 'red'}}> </Header>

      <h1>
        Hello, world
      </h1>

    </div>
  );
}

export default Home;