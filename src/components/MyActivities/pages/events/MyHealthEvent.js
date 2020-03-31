import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Modal,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  CircularProgress,
  Box,
  Snackbar,
} from '@material-ui/core';
import { ExpandMore, KeyboardBackspace } from '@material-ui/icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../../MyActivitiesStyle.scss'; //TODO:باید استایل جداسازی بشه
import { MyHealthEventConsts } from '../../../../constants/MyHealthEventConsts';
import { ActionCreator } from '../../../../redux/actions';
import { PersianLan } from '../../../../constants/Strings';

import styles from '../SignUp/SignUp.module.scss';
import logo from '../../../../logo-header.png';

function MyHealthEvent(props) {
  let history = useHistory();
  const showLoading = useSelector(
    (state) => state.MyActivities.healthEventLoading
  );

  const [open, setOpen] = useState(false); // for open modal
  const [openSnack, setOpenSnack] = useState(false);

  const [item, setItem] = useState([]); //for set modal values
  const [selectedItem, setSelectedItem] = useState(null); // for the item that selected to show it's modal

  const [fever, setFever] = useState(localStorage.getItem('myHealthFever')); // تب
  const [soreThroat, setSoreThroat] = useState(
    localStorage.getItem('myHealthSoreThroat')
  ); // گلودرد
  const [dryCough, setDryCough] = useState(
    localStorage.getItem('myHealthDryCough')
  ); // سرفه خشگ
  const [holdingThe‌ٰ‌‌‌‌Breath, setHoldingTheBreath] = useState(
    localStorage.getItem('myHealthShortnessOfBreath')
  ); // نگه داشتن نفس
  const [breathrate, setBreathrate] = useState(
    localStorage.getItem('myHealthBreathRate')
  ); // تعداد تنفس
  const [adenoid, setAdenoid] = useState(
    localStorage.getItem('myHealthNasalCongestion')
  ); // گرفتگی بینی
  const [bodyPain, setBodyPain] = useState(
    localStorage.getItem('myHealthIBodyPain')
  ); // بدن درد
  const [runnynose, setRunnynose] = useState(
    localStorage.getItem('myHealthIRunnyNose')
  ); // آبریزش بینی
  const [sneeze, setSneeze] = useState(localStorage.getItem('myHealthSneeze')); //عطسه
  const [headache, setHeadache] = useState(
    localStorage.getItem('myHealthIHeadache')
  ); //سردرد
  const [inaction, setInaction] = useState(
    localStorage.getItem('myHealthLethargy')
  ); //بیحالی

  const addHealth = () => {
    if (
      fever === null ||
      soreThroat === null ||
      dryCough === null ||
      holdingThe‌ٰ‌‌‌‌Breath === null ||
      breathrate === null ||
      adenoid === null ||
      bodyPain === null ||
      runnynose === null ||
      sneeze === null ||
      headache === null ||
      inaction === null
    ) {
      setOpenSnack(true);
    } else {
      const data = {
        fever: fever,
        sore_throat: soreThroat,
        dry_cough: dryCough,
        shortness_of_breath: holdingThe‌ٰ‌‌‌‌Breath,
        breath_rate: breathrate,
        nasal_congestion: adenoid,
        body_pain: bodyPain,
        runny_nose: runnynose,
        sneeze: sneeze,
        headache: headache,
        lethargy: inaction,
      };
      props.createHealthEventInBulk(data, history);
    }
  };

  const setSelectedItemVal = (val) => {
    switch (selectedItem) {
      case 1: {
        setFever(val);
        break;
      }
      case 2: {
        setSoreThroat(val);
        break;
      }
      case 3: {
        setDryCough(val);
        break;
      }
      case 4: {
        setHoldingTheBreath(val);
        break;
      }
      case 5: {
        setBreathrate(val);
        break;
      }
      case 6: {
        setAdenoid(val);
        break;
      }
      case 7: {
        setBodyPain(val);
        break;
      }
      case 8: {
        setRunnynose(val);
        break;
      }
      case 9: {
        setSneeze(val);
        break;
      }
      case 10: {
        setHeadache(val);
        break;
      }
      case 11: {
        setInaction(val);
        break;
      }
    }
  };

  return (
    <>
      <AppBar position="fixed" className="activity-header">
        <Toolbar variant="regular">
          <img src={logo} className="app-header-logo" />
          <IconButton
            color="inherit"
            onClick={() => {
              history.push('/add-myactivities');
            }}
          >
            <KeyboardBackspace />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className={`contentWrapper MyHealthEventsWrapper`}>
        <div className="topMessage">
          {PersianLan.myActivitiesTab.healthEventTopMsg}
        </div>

        <div className="healthItemsContainer">
          <div
            onClick={() => {
              setItem(MyHealthEventConsts.fever);
              setSelectedItem(1);
              setOpen(true);
            }}
          >
            <div>
              <span className="item-label">تب: </span>
              <span className="item-value">{fever}</span>
            </div>
            <div className="expand-button">
              <ExpandMore />
            </div>
          </div>
          {/*--------------------------------------------------------*/}
          <div
            onClick={() => {
              setItem(MyHealthEventConsts.soreThroat);
              setSelectedItem(2);
              setOpen(true);
            }}
          >
            <div>
              <span className="item-label">گلودرد: </span>
              <span className="item-value">{soreThroat}</span>
            </div>
            <div className="expand-button">
              <ExpandMore />
            </div>
          </div>
          {/*--------------------------------------------------------*/}
          <div
            onClick={() => {
              setItem(MyHealthEventConsts.dryCough);
              setSelectedItem(3);
              setOpen(true);
            }}
          >
            <div>
              <span className="item-label">سرفه خشک: </span>
              <span className="item-value">{dryCough}</span>
            </div>
            <div className="expand-button">
              <ExpandMore />
            </div>
          </div>
          {/*--------------------------------------------------------*/}
          <div
            onClick={() => {
              setItem(MyHealthEventConsts.holdingThe‌ٰ‌‌‌‌Breath);
              setSelectedItem(4);
              setOpen(true);
            }}
          >
            <div>
              <span className="item-label">نگه داشتن نفس: </span>
              <span className="item-value">{holdingThe‌ٰ‌‌‌‌Breath}</span>
            </div>
            <div className="expand-button">
              <ExpandMore />
            </div>
          </div>
          {/*--------------------------------------------------------*/}
          <div
            onClick={() => {
              setItem(MyHealthEventConsts.breathrate);
              setSelectedItem(5);
              setOpen(true);
            }}
          >
            <div>
              <span className="item-label">تعداد تنفس: </span>
              <span className="item-value">{breathrate}</span>
            </div>
            <div className="expand-button">
              <ExpandMore />
            </div>
          </div>
          {/*--------------------------------------------------------*/}
          <div
            onClick={() => {
              setItem(MyHealthEventConsts.adenoid);
              setSelectedItem(6);
              setOpen(true);
            }}
          >
            <div>
              <span className="item-label">گرفتگی بینی: </span>
              <span className="item-value">{adenoid}</span>
            </div>
            <div className="expand-button">
              <ExpandMore />
            </div>
          </div>
          {/*--------------------------------------------------------*/}
          <div
            onClick={() => {
              setItem(MyHealthEventConsts.bodyPain);
              setSelectedItem(7);
              setOpen(true);
            }}
          >
            <div>
              <span className="item-label">بدن درد: </span>
              <span className="item-value">{bodyPain}</span>
            </div>
            <div className="expand-button">
              <ExpandMore />
            </div>
          </div>
          {/*--------------------------------------------------------*/}
          <div
            onClick={() => {
              setItem(MyHealthEventConsts.runnynose);
              setSelectedItem(8);
              setOpen(true);
            }}
          >
            <div>
              <span className="item-label">آبریزش بینی: </span>
              <span className="item-value">{runnynose}</span>
            </div>
            <div className="expand-button">
              <ExpandMore />
            </div>
          </div>
          {/*--------------------------------------------------------*/}
          <div
            onClick={() => {
              setItem(MyHealthEventConsts.sneeze);
              setSelectedItem(9);
              setOpen(true);
            }}
          >
            <div>
              <span className="item-label">عطسه: </span>
              <span className="item-value">{sneeze}</span>
            </div>
            <div className="expand-button">
              <ExpandMore />
            </div>
          </div>
          {/*--------------------------------------------------------*/}
          <div
            onClick={() => {
              setItem(MyHealthEventConsts.headache);
              setSelectedItem(10);
              setOpen(true);
            }}
          >
            <div>
              <span className="item-label">سردرد: </span>
              <span className="item-value">{headache}</span>
            </div>
            <div className="expand-button">
              <ExpandMore />
            </div>
          </div>
          {/*--------------------------------------------------------*/}
          <div
            onClick={() => {
              setItem(MyHealthEventConsts.inaction);
              setSelectedItem(11);
              setOpen(true);
            }}
          >
            <div>
              <span className="item-label">بی حالی: </span>
              <span className="item-value">{inaction}</span>
            </div>
            <div className="expand-button">
              <ExpandMore />
            </div>
          </div>
        </div>

        <div className="submit-button">
          <Button
            onClick={() => {
              addHealth();
            }}
            disableElevation
            className="addHealthBtn"
            color="primary"
            variant="contained"
          >
            {PersianLan.myActivitiesTab.addHealthConditionBtn}
          </Button>
        </div>

        {/*------------------------------------------------------------------------*/}
        {/*------------------------------------------------------------------------*/}
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="myHealthDialogContainer">
            <List component="div">
              {item.map((val, index) => {
                return (
                  <Fragment key={val}>
                    <ListItem
                      button
                      onClick={() => {
                        setSelectedItemVal(val);
                        setOpen(false);
                      }}
                    >
                      <ListItemText primary={val} />
                    </ListItem>
                  </Fragment>
                );
              })}
            </List>
          </div>
        </Modal>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnack}
        autoHideDuration={4000}
        onClose={() => setOpenSnack(false)}
        message="همه مقادیر را پر کنید"
      />
      <Dialog open={showLoading}>
        <div className={styles.dialogContent}>
          <CircularProgress />
          <Box ml={3}>{'لطفا کمی صبر کنید.'}</Box>
        </div>
      </Dialog>
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreator, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MyHealthEvent);
