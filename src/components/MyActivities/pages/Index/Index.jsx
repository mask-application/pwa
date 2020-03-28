import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../../AppHeader/Header";
import qrCodeIcon from "../../../../assets/svg/qr-code.svg";
import { Box, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/actions/UserActions";

export default function Index() {
  const history = useHistory();
  const dispatch = useDispatch();
  const openQrCode = () => {
    history.push("/my-activities/qr-code");
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };
  // #FIXME - change logout icon
  return (
    <Fragment>
      <Header
        leftComponent={
          <Box>
            <IconButton onClick={openQrCode}>
              <img src={qrCodeIcon} width="20" height="20" alt="qr-code" />
            </IconButton>
            <IconButton onClick={handleLogout}>
              <Close style={{ color: "#fff" }} />
            </IconButton>
          </Box>
        }
      />
    </Fragment>
  );
}
