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
} from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import logo from '../../../../logo-header.png';

import { perToEngDigits } from '../../../../utils';

import styles from './SignUp.module.scss';

export default function SignUp({ onBackClick, onSMSSent }) {
  const [phone, setPhone] = useState('');
  const [condition, setCondition] = useState('');

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function onSubmit() {
    if (!/09\d{9}/.test(perToEngDigits(phone))) {
      // TODO: Use proper notification
      alert('شماره همراه وارد شده صحیح نمی‌باشد.');
      return;
    }
    if (condition === '') {
      // TODO: Use proper notification
      alert('وضعیت شرایط خاص را مشخص کنید.');
      return;
    }
    sendActivationSMS();
  }

  function sendActivationSMS() {
    setIsDialogOpen(true);
    axios({
      method: 'POST',
      url: '/api/v1/user/register',
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
        // TODO: Use proper notification
        alert('ارسال کد با خطا مواجه شد!');
        setIsDialogOpen(false);
      });
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} className="app-header-logo" />
          <IconButton color="inherit" onClick={onBackClick}>
            <KeyboardBackspaceIcon />
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
    </>
  );
}
