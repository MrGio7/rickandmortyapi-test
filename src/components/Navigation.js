import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <ButtonGroup variant="text" aria-label="text button group">
      <Button>
        <Link to="/">Home</Link>
      </Button>
      <Button>
        <Link to="/liked">Liked</Link>
      </Button>
    </ButtonGroup>
  );
}
