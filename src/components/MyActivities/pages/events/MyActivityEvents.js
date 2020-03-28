import React from "react";
import "../../MyActivitiesStyle.scss"; //TODO: باید استایل جداسازی بشه
import {PersianLan} from "../../../../constants/Strings";
import Button from '@material-ui/core/Button';
import {Person , LocationOn , People} from "@material-ui/icons";
import {useHistory} from "react-router-dom";

export default function MyActivityEvents(){

    let history = useHistory();
    return (
        <div className={`contentWrapper MyActivityEventsWrapper`}>
            <div className="myActivityRow healthInfo" onClick={() => {history.push("/my-health-event")}}>
                <Person color="primary" style={{fontSize:50}} />
                <div className="content">
                    <h3>{PersianLan.myActivitiesTab.interHealthInfo}</h3>
                    <p>{PersianLan.myActivitiesTab.interHealthInfoContent}</p>
                </div>
            </div>
            <div className="myActivityRow locationInfo">
                <LocationOn color="primary" style={{fontSize:50}}/>
                <div className="content">
                    <h3>{PersianLan.myActivitiesTab.interLocation}</h3>
                    <p>{PersianLan.myActivitiesTab.interLocationContent}</p>
                </div>
            </div>
            <div className="myActivityRow meetings">
                <People color="primary" style={{fontSize:50}}/>
                <div className="content">
                    <h3>{PersianLan.myActivitiesTab.interMeetings}</h3>
                    <p>{PersianLan.myActivitiesTab.interMeetingsContent}</p>
                </div>
            </div>
        </div>
    )
}
