import React from "react";
import { Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import FacebookLogin from "./FacebookLogin";
import "../styles/navigation.scss";

export default function Navigation() {
  return (
    <nav>
      <Button>
        <Link to="/">Home</Link>
      </Button>
      <Divider orientation="vertical" flexItem />
      <Button>
        <Link to="/liked">Liked</Link>
      </Button>
      <Divider orientation="vertical" flexItem />
      <FacebookLogin />
    </nav>
  );
}
