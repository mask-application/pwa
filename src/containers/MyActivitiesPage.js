import React, {Fragment} from "react";
import MyActivities from "../components/MyActivities/MyActivities";
import Header from "../components/AppHeader/Header";

function MyActivitiesPage(props) {
    return (
        <>
            <Header/>
            <MyActivities/>
        </>
    )
}

export default MyActivitiesPage;