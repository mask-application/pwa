import React, { useState } from 'react';
import './AddToHomeScreenModalStyle.scss';
import { isIos, isInStandaloneMode } from '../../utils/isIOS';
import { Button, Dialog, Paper } from '@material-ui/core';
import logo from '../../logo.png';
import ShareIcon from '../../assets/images/ShareIcon.svg';
import AddToHomeScreenIcon from '../../assets/images/AddToHomeScreenIcon.svg';
import { useIntl } from '../../intl';

export default function AddToHomeScreenModal() {
  const intl = useIntl();
  const [modalShow, setModalShow] = useState(true);

  const handleOnCloseButtonClick = () => {
    setModalShow(false);
  };

  const shouldRender = modalShow && isIos() && !isInStandaloneMode();

  return (
    <div>
      {shouldRender && (
        <Dialog fullScreen open={modalShow} className="add-to-home-screen">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <span className="flex-column perfect-center">
            {intl.formatMessage('add-to-home.title')}
          </span>
          <Paper className="steps flex-column perfect-center">
            <span>
              {intl.formatMessage('add-to-home.step1.first')}
              <img className="share-icon" src={ShareIcon} alt="Share" />
              {intl.formatMessage('add-to-home.step1.end')}
            </span>
            <span>
              {intl.formatMessage('add-to-home.step2.first')}
              <img
                className="add-to-home-screen-icon"
                src={AddToHomeScreenIcon}
                alt="Add To Home Screen"
              />
              {intl.formatMessage('add-to-home.step2.end')}
            </span>
            <span>{intl.formatMessage('add-to-home.step3.first')}</span>
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
