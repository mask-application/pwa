import React, { Component } from 'react';
import './AddToHomeScreenModalStyle.scss';
import { isIos, isInStandaloneMode } from '../../utils/isIOS';
import { Button, Dialog, Paper } from '@material-ui/core';
import logo from '../../logo.png';
import ShareIcon from '../../assets/images/ShareIcon.svg';
import AddToHomeScreenIcon from '../../assets/images/AddToHomeScreenIcon.svg';

class AddToHomeScreenModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: true,
    };
    this.handleOnCloseButtonClick = this.handleOnCloseButtonClick.bind(this);
  }

  handleOnCloseButtonClick() {
    this.setState({ modalShow: false });
  }

  render() {
    const { modalShow } = this.state;
    const handleOnCloseButtonClick = this.handleOnCloseButtonClick;
    const shouldRender = modalShow && isIos() && !isInStandaloneMode();

    return (
      <div>
        {shouldRender && (
          <Dialog fullScreen open={modalShow} className="add-to-home-screen">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <span className="flex-column perfect-center">
              نصب نسخه پیشرو ماسک (مخصوص کاربران آیفون)
            </span>
            <Paper className="steps flex-column perfect-center">
              <span>
                ۱- در نوار پایین، روی
                <img className="share-icon" src={ShareIcon} alt="Share" />
                کلیک کنید.
              </span>
              <span>
                ۲- در منوی باز شده روی
                <img
                  className="add-to-home-screen-icon"
                  src={AddToHomeScreenIcon}
                  alt="Add To Home Screen"
                />
                کلیک کنید.
              </span>
              <span>۳- در آخر در بالای صفحه دکمه Add را کلیک کنید.</span>
            </Paper>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOnCloseButtonClick}
            >
              بعدا
            </Button>
          </Dialog>
        )}
      </div>
    );
  }
}

export default AddToHomeScreenModal;
