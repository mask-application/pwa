import React, { Component } from 'react';
import './HeaderStyle.scss';
import logo from '../../logo.png';
import notification from '../../assets/images/Notification.svg';
import { Box, Badge, Dialog, Typography } from '@material-ui/core';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen(event) {
    if (event.target.className === 'notif-btn')
      this.setState({ isDialogOpen: true });
    else this.setState({ isDialogOpen: false });
  }

  render() {
    return (
      <div className="HeaderWrapper" name="close" onClick={this.handleOpen}>
        <div className="notif-button-wrapper">
          <Badge variant="dot" color="primary">
            <button type="button" name="open" onClick={this.handleOpen}>
              <img
                src={notification}
                className="notif-btn"
                alt="Notification"
              />
            </button>
          </Badge>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <Typography variant="subtitle2" className="beta-version">
            نسخه آزمایشی
          </Typography>
        </div>

        <Dialog open={this.state.isDialogOpen}>
          <Box ml={3} className="notif-msg">
            این برنامه در حال به روز رسانی می‌باشد، برای بهره‌مندی از جدیدترین
            امکانات، به‌روز باشید!
          </Box>
        </Dialog>
      </div>
    );
  }
}

export default Header;
