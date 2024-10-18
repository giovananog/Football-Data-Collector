import { React } from "react";
import Header from "../header/Header";
import { Link } from "@mui/material";

function Home(props) {

  return (
    <div className="home-div" style={{backgroundColor: '#eee8e8'}}>
      <Header sx={{ color: '#ccc'}}> </Header>

      <h1>
        Hello, world
      </h1>

    </div>
  );
}

export default Home;