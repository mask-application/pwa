import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import '../../MyActivitiesStyle.scss';
import { PersianLan } from '../../../../constants/Strings';
import {
  Bluetooth,
  CameraAlt,
  CropFree,
  ArrowForward,
  Warning,
} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { PlaylistAdd, Favorite } from '@material-ui/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreator } from '../../../../redux/actions';
import logo from '../../../../logo-header.png';

function MyActivitiesLoggedin(props) {
  let history = useHistory();

  const date =
    props.eventResult !== null
      ? new Intl.DateTimeFormat('fa', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }).format(new Date(props.createTime))
      : null;

  const firstDate =
    props.firstCreateTime !== null
      ? new Intl.DateTimeFormat('fa', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }).format(new Date(props.firstCreateTime))
      : null;

  const mySelf =
    props.eventResult !== null
      ? props.eventResult.people.filter((person) => {
          return person.phone_number === props.eventResult.phone_number;
        })
      : null;
  let healthMessageColor = 'rgba(0,0,0,0.75)';
  if (mySelf !== null) {
    if (mySelf[0].health_state == 1) {
      healthMessageColor = '#00ffba';
    } else if (mySelf[0].health_state == 2) {
      healthMessageColor = '#f1e100';
    } else if (mySelf[0].health_state == 3) {
      healthMessageColor = '#ff005c';
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} className="app-header-logo" />
          <div>
            <IconButton color="inherit">
              <Bluetooth />
            </IconButton>
            <IconButton color="inherit">
              <CameraAlt />
            </IconButton>
            <IconButton color="inherit">
              <CropFree />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div
        className={`contentWrapper MyActivitiesWrapper`}
        style={
          props.eventResult === null
            ? { justifyContent: 'center' }
            : { justifyContent: 'flex-start' }
        }
      >
        {props.eventResult === null && (
          <>
            <PlaylistAdd
              style={{ fontSize: 80, marginBottom: 22, marginTop: -50 }}
              color="primary"
            />
            <span className="message">
              {PersianLan.myActivitiesTab.noActivityYet}
            </span>
            <span className="message">
              {PersianLan.myActivitiesTab.touchButtonToSetActivity}
            </span>
          </>
        )}

        {props.eventResult !== null && (
          <div>
            <div className="lastUpdateContainer">
              <span>زمان بروزرسانی وضعیت شما:</span>
              <span>{date}</span>
            </div>
            <div className="healthMessageContainer">
              {mySelf[0].health_state === 1 && (
                <Favorite style={{ fontSize: 70, color: healthMessageColor }} />
              )}
              {mySelf[0].health_state === 2 && (
                <Warning style={{ fontSize: 70, color: healthMessageColor }} />
              )}
              {mySelf[0].health_state === 3 && (
                <Warning style={{ fontSize: 70, color: healthMessageColor }} />
              )}
              <div className="healthMessage">
                <p style={{ color: healthMessageColor, fontSize: 18 }}>
                  {props.eventResult.people[0].health_message}
                </p>
              </div>
            </div>
            <div className="healthCount">
              <span>{props.eventCounter} بار ثبت اطلاعات در سلامت روزانه</span>
              {props.eventCounter > 1 && (
                <span className="healthPerod">
                  از {firstDate} تا {date}
                </span>
              )}
            </div>
          </div>
        )}
        <Button
          onClick={() => {
            props.hideNavigation();
            history.push('/add-myactivities');
          }}
          disableElevation
          className={`btn addActivityBtn`}
          color="primary"
          variant="contained"
        >
          {PersianLan.myActivitiesTab.addNewActivity}
        </Button>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    eventResult: state.MyActivities.eventResult,
    eventCounter: state.MyActivities.eventCounter,
    createTime: state.MyActivities.createTime,
    firstCreateTime: state.MyActivities.firstCreateTime,
    user: state.MyActivities.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreator, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyActivitiesLoggedin);
