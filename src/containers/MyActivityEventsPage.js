import React, {Fragment} from "react";
import MyActivityEvents from "../components/MyActivities/MyActivityEvents";
import Header from "../components/AppHeader/Header";
import {useHistory} from "react-router-dom";

function MyActivityEventsPage() {
    let history = useHistory();
    return (
        <>
            <Header isInnerPage backClick={() =>{history.push("/me")}}/>
            <MyActivityEvents/>
        </>
    )
}

export default MyActivityEventsPage;