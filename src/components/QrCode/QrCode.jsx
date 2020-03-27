import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../AppHeader/Header";
import Qrcode from "qrcode.react";
import styles from "./QrCode.module.scss";
import { Box, Typography, CircularProgress } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import api from "../../gate/api";

export default function ShowQrCode() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [qrValue, setQrValue] = useState(13570);

  useEffect(() => {
    api.auth
      .profile()
      .then(res => {
        setLoading(false);
        setQrValue(res);
        console.log(res);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  const backClick = () => {
    history.push("/my-activities");
  };

  return (
    <Fragment>
      <Header title="کد اختصاصی من" backBtn onClickBackBtn={backClick} />
      <Box className={styles.qrCode}>
        {loading ? <CircularProgress /> : <Qrcode value={qrValue} />}
      </Box>
      <Box className={styles.warning}>
        <Typography>
          <FormattedMessage id="pages-info.qr-code.description" />
        </Typography>
        <Typography component="span" variant="caption">
          <FormattedMessage id="pages-info.qr-code.warning" />
        </Typography>
      </Box>
    </Fragment>
  );
}
