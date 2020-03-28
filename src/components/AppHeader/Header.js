import React from "react";
import "./HeaderStyle.scss";
import { PersianLan } from "../../constants/Strings";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton
} from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";

export default function Header({
  title = null,
  leftComponent,
  backBtn,
  onClickBackBtn
}) {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        {backBtn && (
          <IconButton edge="start" color="inherit" onClick={onClickBackBtn}>
            <ArrowForward />
          </IconButton>
        )}
        <Box className="title">
          <Typography variant="h6" color="inherit">
            {title !== null ? title : PersianLan.app_header}
          </Typography>
        </Box>
        {leftComponent ? leftComponent : null}
      </Toolbar>
    </AppBar>
  );
}
