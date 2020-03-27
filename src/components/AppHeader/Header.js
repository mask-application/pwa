import React from "react";
import "./HeaderStyle.scss";
import {PersianLan} from "../../constants/Strings";
import {AppBar, Toolbar , IconButton, Typography} from "@material-ui/core";
import {Bluetooth, CameraAlt , CropFree, ArrowForward} from "@material-ui/icons";
import {connect} from "react-redux";
import {ActionCreator} from "../../redux/actions";
import {bindActionCreators} from "redux";


function Header(props) {
    return (
        <AppBar position="static">
            <Toolbar variant="regular">
                {props.isInnerPage &&
                <IconButton color="inherit" onClick={() => {
                    props.backClick()
                    if(!props.backToInner) {
                        props.showNav();
                    }
                }}>
                    <ArrowForward />
                </IconButton>
                }
                <Typography variant="h6" color="inherit">
                    {PersianLan.app_header}
                </Typography>
                {!props.isInnerPage &&
                <div>
                    <IconButton color="inherit">
                        <Bluetooth/>
                    </IconButton>
                    <IconButton color="inherit">
                        <CameraAlt/>
                    </IconButton>
                    <IconButton color="inherit">
                        <CropFree/>
                    </IconButton>

                </div>
                }
            </Toolbar>
        </AppBar>
    )

}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreator , dispatch);
}

export default connect(mapStateToProps , mapDispatchToProps)(Header);