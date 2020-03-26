import React from "react";
import "./HeaderStyle.scss";
import { PersianLan } from "../../constants/Strings";
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";

export default function Header({ leftComponent }) {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Box className="title">
          <Typography variant="h6" color="inherit">
            {PersianLan.app_header}
          </Typography>
        </Box>
        {leftComponent ? leftComponent : null}
      </Toolbar>
    </AppBar>
  );
}
