import * as LoginActions from "../../components/loginPage/LoginActions";
import * as HomeActions from "../../components/Home/HomeActions";
import * as FamiliesActivitiesActions from "../../components/FamilyActivities/FamiliesActivitiesActions";
import * as InformingActions from "../../components/Informing/InformingActions";
import * as MapActions from "../../components/Map/MapActions";
import * as MyActivitiesActions from "../../components/MyActivities/MyActivitiesActions";

export const ActionCreator = Object.assign({},
    LoginActions,
    HomeActions,
    FamiliesActivitiesActions,
    InformingActions,
    MapActions,
    MyActivitiesActions
);