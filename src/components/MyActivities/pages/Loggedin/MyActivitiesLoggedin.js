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
} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { PlaylistAdd, Favorite } from '@material-ui/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreator } from '../../../../redux/actions';

function MyActivitiesLoggedin(props) {
  let history = useHistory();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            ماسک
          </Typography>

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
            <div className="healthMessage">
              <div>
                <Favorite style={{ fontSize: 80 }} color="green" />
              </div>
              <div>
                <p>{props.eventResult.people[0].health_message}</p>
              </div>
            </div>
            <div className="healthCount">
              {props.eventCounter} بار ثبت اطلاعات در سلامت روزانه
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreator, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyActivitiesLoggedin);
