import React from "react";
import MyActivities from "../components/MyActivities/MyActivities";
import Header from "../components/AppHeader/Header";
import { Box, IconButton, SvgIcon } from "@material-ui/core";
import { CropFree } from "@material-ui/icons";
import QrCode from "../assets/svg/qr-code.svg";

function MyActivitiesPage() {
  return (
    <>
      <Header
        leftComponent={
          <Box>
            <IconButton>
              <img src={QrCode} width="20" height="20" />
            </IconButton>
          </Box>
        }
      />
      <MyActivities />
    </>
  );
}

export default MyActivitiesPage;
