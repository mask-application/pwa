import React, { useState } from 'react';
import './HeaderStyle.scss';
import logo from '../../logo.png';
import notification from '../../assets/images/Notification.svg';
import { Box, Badge, Dialog, Typography } from '@material-ui/core';

export default function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNotif = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <div className="HeaderWrapper" onClick={() => handleNotif()}>
      <div className="notif-button-wrapper">
        <Badge variant="dot" color="primary">
          <button type="button">
            <img src={notification} alt="Notification" />
          </button>
        </Badge>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <Typography variant="subtitle2" className="beta-version">
          نسخه آزمایشی
        </Typography>
      </div>

      <Dialog open={isDialogOpen}>
        <Box ml={3} className="notif-msg">
          این برنامه در حال به روز رسانی می‌باشد، برای بهره‌مندی از جدیدترین
          امکانات، به‌روز باشید!
        </Box>
      </Dialog>
    </div>
  );
}
