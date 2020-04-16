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
import { KeyboardBackspace, Edit } from '@material-ui/icons';
import useTimer from 'react-commons/dist/hooks/timer';

import { perToEngDigits } from '../../../../utils';

import styles from './Activation.module.scss';
import logo from '../../../../logo-header.png';

export default function Activation({ onBackClick, onActivate }) {
  const ttl = useSelector((store) => store.MyActivities.ttl);
  const phone = useSelector((store) => store.MyActivities.phone);
  const condition = useSelector((store) => store.MyActivities.condition);

  const { i: countdown, start } = useTimer({ start: ttl });

  const [code, setCode] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [smsSent, setSmsSent] = useState(false);

  useEffect(() => {
    start();
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, []);

  function sendActivationSMS() {
    setIsDialogOpen(true);
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_REGISTER_USER_AGAIN}`,
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
      url: `${process.env.REACT_APP_ACTIVATE_USER}`,
      data: {
        phone_number: phone,
        code: perToEngDigits(code),
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
      <AppBar position="static" className="activity-header">
        <Toolbar>
          <img src={logo} className="app-header-logo" />
          <IconButton color="inherit" onClick={onBackClick}>
            <KeyboardBackspace />
          </IconButton>
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
        <Box mt={3} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="activation-btn"
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
          <Box mt={2} textAlign="center">
            <Button color="primary" onClick={sendActivationSMS}>
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
