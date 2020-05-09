import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Paper,
  Button,
  Tooltip,
} from '@material-ui/core';
import { KeyboardBackspace, BluetoothSearching } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { showNav } from '../../../../redux/actions/CommonActions';
import styles from './BluetoothPage.module.scss';
import logo from '../../../../logo-header.png';

export default function BluetoothPage() {
  let history = useHistory();
  const dispatch = useDispatch();
  const unique_id = useSelector((state) => state.MyActivities.user.unique_id);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCodeClick = () => {
    setShowTooltip(true);
    navigator.clipboard.writeText(`person:${unique_id}`);
    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  return (
    <>
      <AppBar position="static" className="activity-header">
        <Toolbar>
          <img alt="mask" src={logo} className="app-header-logo" />
          <IconButton
            color="inherit"
            onClick={() => {
              dispatch(showNav());
              history.push('/my-activities');
            }}
          >
            <KeyboardBackspace />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box className={styles['bt-box']}>
        <div className={styles['bt-box-body']}>
          <BluetoothSearching style={{ fontSize: 150, color: '#ff005c' }} />
          <Paper elevation={0} className={styles['uid-paper']}>
            <span>{'کد شخصی شما'}</span>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={() => setShowTooltip(false)}
              open={showTooltip}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="کپی شد!"
              placement="top"
            >
              <Button className={styles['uid-btn']} onClick={handleCodeClick}>
                {`person:${unique_id}`}
              </Button>
            </Tooltip>
          </Paper>
        </div>
      </Box>
      <Box className="warning-box">
        <Typography>
          برای ثبت ملاقات توسط افراد نزدیک به شما توسط بلوتوث، کد بالا را در نام
          بلوتوث دستگاه خود قرار دهید.
        </Typography>
        <Typography component="span" variant="caption">
          این کد حاوی هیچ گونه اطلاعات شخصی یا درمانی شما نیست و تنها جهت
          شناسایی شما در نرم‌افزار استفاده می‌شود.
        </Typography>
      </Box>
    </>
  );
}
