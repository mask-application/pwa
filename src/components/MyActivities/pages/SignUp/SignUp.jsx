import React, { useState } from 'react';
import axios from 'axios';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  InputLabel,
  FormControl,
  Dialog,
  CircularProgress,
  Snackbar,
} from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';
import logo from '../../../../logo-header.png';

import { perToEngDigits } from '../../../../utils';

import styles from './SignUp.module.scss';

export default function SignUp({ onBackClick, onSMSSent }) {
  const [phone, setPhone] = useState('');
  const [condition, setCondition] = useState('');

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState('');

  function onSubmit() {
    if (!/09\d{9}/.test(perToEngDigits(phone))) {
      setAlertText('شماره همراه وارد شده صحیح نمی‌باشد.');
      setIsAlertOpen(true);
      return;
    }
    if (condition === '') {
      setAlertText('وضعیت شرایط خاص را مشخص کنید.');
      setIsAlertOpen(true);
      return;
    }
    sendActivationSMS();
  }

  function sendActivationSMS() {
    setIsDialogOpen(true);
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_REGISTER_USER}`,
      data: {
        phone_number: perToEngDigits(phone),
        risk_group: condition,
      },
    })
      .then(({ data }) => {
        setIsDialogOpen(false);
        onSMSSent({
          phone: perToEngDigits(phone),
          condition,
          ttl: data.activate_ttl,
        });
      })
      .catch((err) => {
        console.error(err);
        setIsDialogOpen(false);
        setAlertText('ارسال کد با خطا مواجه شد!');
        setIsAlertOpen(true);
      });
  }

  return (
    <>
      <AppBar position="static" className="activity-header">
        <Toolbar>
          <img src={logo} className="app-header-logo" alt="logo" />
          <IconButton color="inherit" onClick={onBackClick}>
            <KeyboardBackspace />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={styles.container}>
        <TextField
          label="شماره همراه"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
        />
        <Box mt={2}>
          <FormControl fullWidth>
            <InputLabel id="condition-select-label">
              شرایط خاص دارید؟
            </InputLabel>
            <Select
              id="condition-select"
              labelId="condition-select-label"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <MenuItem value={0}>
                <div className={styles.menuItem}>
                  <strong>۱. بدون شرایط خاص</strong>
                </div>
              </MenuItem>
              <MenuItem
                value={1}
                style={{ whiteSpace: 'normal', textAlign: 'justify' }}
              >
                <div className={styles.menuItem}>
                  <strong>۲. بیماران با نقص ایمنی:</strong>
                  &nbsp; تحت درمان با کورتیکواستروئید، شیمی درمانی، بدخیمی‌ها،
                  پیوند اعضا، مبتلایان به HIV
                </div>
              </MenuItem>
              <MenuItem
                value={2}
                style={{ whiteSpace: 'normal', textAlign: 'justify' }}
              >
                <div className={styles.menuItem}>
                  <strong>۳. بیماران با بیماری زمینه‌ای و سالمندان:</strong>
                  &nbsp; بیماری قلبی عروقی، فشار خون، بیماری‌های تنفسی زمینه‌ای،
                  دیابت و افراد بالای ۵۰ سال
                </div>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle2" align="center">
            برای استفاده از قابلیت پیگیری وضعیت سلامتی لازم است ابتدا در
            نرم‌افزار ثبت‌نام کنید.
          </Typography>
        </Box>
        <Box mt={2} className={styles.verificationButtonContainer}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onSubmit}
            className={styles.verificationButton}
          >
            ارسال کد فعال‌سازی
          </Button>
        </Box>
      </div>
      <Dialog open={isDialogOpen}>
        <div className={styles.dialogContent}>
          <CircularProgress />
          <Box ml={3}>{'لطفا کمی صبر کنید.'}</Box>
        </div>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={isAlertOpen}
        autoHideDuration={5000}
        onClose={() => setIsAlertOpen(false)}
        message={alertText}
      />
    </>
  );
}
