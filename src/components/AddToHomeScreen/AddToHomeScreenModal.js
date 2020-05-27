import React, { useState } from 'react';
import './AddToHomeScreenModalStyle.scss';
import { isInStandaloneMode } from '../../utils/isInStandaloneMode';
import { Button, Dialog, Paper } from '@material-ui/core';
import logo from '../../logo.png';
import ShareIcon from '../../assets/images/ShareIcon.svg';
import AddToHomeScreenIcon from '../../assets/images/AddToHomeScreenIcon.svg';
import { useIntl } from '../../intl';
import { isAndroid, isMobile, isIOS, isIPad13 } from 'react-device-detect';
import { useHistory } from 'react-router-dom';

export default function AddToHomeScreenModal() {
  const intl = useIntl();
  let history = useHistory();
  const [modalShow, setModalShow] = useState(true);

  const handleOnCloseButtonClick = () => {
    setModalShow(false);
  };

  const renderInThisDevice =
    (process.env.REACT_APP_ADD_TO_HOME_SCREEN_MODAL_ANDROID === 'true' &&
      isAndroid) ||
    (process.env.REACT_APP_ADD_TO_HOME_SCREEN_MODAL_IOS === 'true' &&
      (isMobile || isIPad13));

  const shouldRender = renderInThisDevice && modalShow && !isInStandaloneMode();

  //TODO Add time for modal show again

  return (
    <div>
      {shouldRender && (
        <Dialog fullScreen open={modalShow} className="add-to-home-screen">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>

          {(isIOS || isIPad13) && (
            <>
              <h3 className="flex-column perfect-center text">
                {(isIOS || isIPad13) &&
                  intl.formatMessage('add-to-home.ios.title')}
              </h3>
              <Paper className="steps flex-column perfect-center">
                <span>
                  {(isIOS || isIPad13) &&
                    intl.formatMessage('add-to-home.ios.step1.first')}
                  {(isIOS || isIPad13) && (
                    <img className="share-icon" src={ShareIcon} alt="Share" />
                  )}

                  {intl.formatMessage('add-to-home.ios.step1.end')}
                </span>
                <span>
                  {intl.formatMessage('add-to-home.step2.first')}
                  {(isIOS || isIPad13) && (
                    <img
                      className="add-to-home-screen-icon"
                      src={AddToHomeScreenIcon}
                      alt="Add To Home Screen"
                    />
                  )}
                  {intl.formatMessage('add-to-home.step2.end')}
                </span>
                <span>{intl.formatMessage('add-to-home.step3.first')}</span>
              </Paper>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOnCloseButtonClick}
              >
                {intl.formatMessage('add-to-home.add-later')}
              </Button>
            </>
          )}
          {isAndroid && (
            <>
              <Paper className="steps flex-column perfect-center">
                <h3 className="flex-column perfect-center text">
                  {isAndroid &&
                    intl.formatMessage('add-to-home.android.description')}
                </h3>
              </Paper>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  history.push('/application.html');
                }}
              >
                {intl.formatMessage('add-to-home.down-android')}
              </Button>
              <Button
                className="btn_web"
                variant="contained"
                color="primary"
                onClick={handleOnCloseButtonClick}
              >
                {intl.formatMessage('add-to-home.web')}
              </Button>
            </>
          )}
        </Dialog>
      )}
    </div>
  );
}
