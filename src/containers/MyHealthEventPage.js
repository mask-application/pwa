import React, {Fragment} from "react";
import MyHealthEvent from "../components/MyActivities/MyHealthEvent";
import Header from "../components/AppHeader/Header";
import {useHistory} from "react-router-dom";

function MyHealthEventPage() {
    let history = useHistory();
    return (
        <>
            <Header isInnerPage backToInner backClick={() =>{history.push("/add-myactivities")}}/>
            <MyHealthEvent/>
        </>
    )
}

export default MyHealthEventPage;