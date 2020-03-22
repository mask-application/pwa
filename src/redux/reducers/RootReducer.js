import {combineReducers} from "redux";
import {LoginReducer} from "../../components/loginPage/LoginReducer";
import {HomeReducer} from "../../components/Home/HomeReducer";
import {InformingReducer} from "../../components/Informing/InformingReducer";
import {FamiliesActivitiesReducer} from "../../components/FamilyActivities/FamiliesActivitiesReducer";
import {MyActivitiesReducer} from "../../components/MyActivities/MyActivitiesReducer";

export default combineReducers(
    LoginReducer,
    HomeReducer,
    InformingReducer,
    FamiliesActivitiesReducer,
    MyActivitiesReducer,
    MyActivitiesReducer

);