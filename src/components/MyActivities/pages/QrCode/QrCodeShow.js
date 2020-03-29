import React from 'react';
import { useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import QrCode from 'qrcode.react';
import '../../MyActivitiesStyle.scss'; //TODO: باید استایل جداسازی بشه

import { showNav } from '../../../../redux/actions/CommonActions';

export default function QrCodeShow(props) {
  let history = useHistory();
  const dispatch = useDispatch();

  // FIXME - add profile request

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="regular">
          <IconButton
            color="inherit"
            onClick={() => {
              dispatch(showNav());
              history.push('/my-activities');
            }}
          >
            <ArrowForward />
          </IconButton>
          <Typography variant="h6" color="inherit">
            کد اختصاصی من
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className="qr-code-box">
        <QrCode value="xxxxxxxx" />
      </Box>
      <Box className="warning-box">
        <Typography>
          در صورتی که با فردی ملاقت کرده اید، فرد مقابل بایستی با استفاده از
          آیکن دوربین در اپلیکیشن خود این صفحه را تصویر برداری کند.
        </Typography>
        <Typography component="span" variant="caption">
          این کد حاوی هیچ گونه اطلاعات شخصی یا درمانی شما نیست و تنها جهت
          شناسایی شما در نرم افزار استفاده می شود.
        </Typography>
      </Box>
    </>
  );
}
