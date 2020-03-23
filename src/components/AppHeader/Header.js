import React from "react";
import "./HeaderStyle.scss";
import {PersianLan} from "../../constants/Strings";
import {AppBar, Toolbar , IconButton, Typography} from "@material-ui/core";

export default function Header(props) {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit">
                    {PersianLan.app_header}
                </Typography>
            </Toolbar>
        </AppBar>
    )

}