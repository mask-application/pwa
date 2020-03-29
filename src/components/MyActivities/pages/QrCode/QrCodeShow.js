import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import axios from 'axios';

export default function QrCodeShow(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  const unique_id = useSelector((state) => state.MyActivities.user.unique_id);

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
        <QrCode value={unique_id} />
      </Box>
      <Box className="warning-box">
        <Typography>
          در صورتی که با فردی ملاقت کرده‌اید، فرد مقابل بایستی با استفاده از
          آیکون دوربین در اپلیکیشن خود این صفحه را تصویربرداری کند.
        </Typography>
        <Typography component="span" variant="caption">
          این کد حاوی هیچ گونه اطلاعات شخصی یا درمانی شما نیست و تنها جهت
          شناسایی شما در نرم‌افزار استفاده می‌شود.
        </Typography>
      </Box>
    </>
  );
}
