import React, {Fragment} from "react";
import {useHistory} from "react-router-dom"
import "./MyActivitiesStyle.scss";
import {PersianLan} from "../../constants/Strings";
import Button from '@material-ui/core/Button';
import {PlaylistAdd ,Favorite} from "@material-ui/icons";
import {connect} from "react-redux";
import {ActionCreator} from "../../redux/actions";
import {bindActionCreators} from "redux";

function myActivitiesLogined(props) {
    let history = useHistory();
    console.log(props);
    return (
        <div className={`contentWrapper MyActivitiesWrapper`} style={props.eventResult === null ? {justifyContent:"center"} : {justifyContent:"flex-start"}}>
            {props.eventResult === null &&
            <>
                <PlaylistAdd style={{fontSize: 80, marginBottom: 22, marginTop: -50}} color="primary"/>
                <span className="message">{PersianLan.myActivitiesTab.noActivityYet}</span>
                <span className="message">{PersianLan.myActivitiesTab.touchButtonToSetActivity}</span>
            </>
            }

            {props.eventResult !== null &&
                <div>
                    <div>
                    <div>
                        <Favorite style={{fontSize: 80, marginBottom: 22, marginTop: -50}} color="primary"/>
                    </div>
                    <div>
                        <p>{props.eventResult.people[0].health_message}</p>
                    </div>
                    </div>
                    <div>
                        {props.eventCounter} بار ثبت اطلاعات در سلامت روزانه
                    </div>
                </div>

            }
            <Button onClick={() => {
                props.hideNavigation();
                history.push("/add-myactivities");
            }}
                    disableElevation
                    className={`btn addActivityBtn`}
                    color="primary"
                    variant="contained">{PersianLan.myActivitiesTab.addNewActivity}</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        eventResult: state.MyActivitiesReducer.eventResult,
        eventCounter:state.MyActivitiesReducer.eventCounter
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreator, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(myActivitiesLogined);