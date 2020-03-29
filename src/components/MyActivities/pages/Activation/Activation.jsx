import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ArrowForward, Edit } from '@material-ui/icons';
import useTimer from 'react-commons/dist/hooks/timer';

import styles from './Activation.module.scss';

export default function Activation({ onBackClick, onActivate }) {
  const ttl = useSelector((store) => store.MyActivities.ttl);
  const phone = useSelector((store) => store.MyActivities.phone);
  const condition = useSelector((store) => store.MyActivities.condition);

  const { i: countdown, start } = useTimer({ start: ttl });

  const [code, setCode] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [smsSent, setSmsSent] = useState(false);

  useEffect(
    () => {
      start();
    },
    [
      /*eslint-disable-line react-hooks/exhaustive-deps*/
    ]
  );

  function sendActivationSMS() {
    setIsDialogOpen(true);
    axios({
      method: 'POST',
      url: '/api/v1/user/register',
      data: {
        phone_number: phone,
        risk_group: condition,
      },
    })
      .then(() => {
        setIsDialogOpen(false);
        setSmsSent(true);
      })
      .catch((err) => {
        console.error(err);
        // FIXME: Use proper notification
        alert('ارسال کد با خطا مواجه شد!');
        setIsDialogOpen(false);
      });
  }

  function onSubmit() {
    setIsDialogOpen(true);
    axios({
      method: 'POST',
      url: '/api/v1/user/activate',
      data: {
        phone_number: phone,
        code,
      },
    })
      .then(({ data }) => {
        setIsDialogOpen(false);
        onActivate({
          token: data.access_token,
          user: data.user,
        });
      })
      .catch((err) => {
        console.error(err);
        // FIXME: Use proper notification
        alert('کد واردشده اشتباه است!');
        setIsDialogOpen(false);
      });
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onBackClick}>
            <ArrowForward />
          </IconButton>
          {/* #FIXME Use formattedMessage */}
          <Typography variant="h6" color="inherit">
            ثبت نام
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={styles.container}>
        {/* #FIXME Use formattedMessage */}
        <Typography align="center">
          کد فعال‌سازی ۵ رقمی که برای شما پیامک شد را وارد کنید.
        </Typography>
        <Box mt={2} textAlign="center">
          <Button color="primary" onClick={onBackClick}>
            <div>{phone}</div>
            <Edit className={styles.editIcon} fontSize="small" />
          </Button>
        </Box>
        <Box mt={4}>
          <TextField
            label="کد فعال‌سازی"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            fullWidth
          />
        </Box>
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={onSubmit}
          >
            فعال‌سازی
          </Button>
        </Box>
        <Box mt={3}>
          <Typography color="primary" align="center">
            {`فرصت باقی مانده برای ورود: ${Math.floor(countdown / 60)}:${
              countdown % 60
            }`}
          </Typography>
        </Box>
        {!smsSent && (
          <Box
            mt={2}
            textAlign="center"
            className={styles.activationButtonContainer}
          >
            <Button
              color="primary"
              onClick={sendActivationSMS}
              className={styles.activationButton}
            >
              ارسال مجدد کد فعال‌سازی
            </Button>
          </Box>
        )}
      </div>
      <Dialog open={isDialogOpen}>
        <div className={styles.dialogContent}>
          <CircularProgress />
          <Box ml={3}>{'لطفا کمی صبر کنید.'}</Box>
        </div>
      </Dialog>
    </>
  );
}
