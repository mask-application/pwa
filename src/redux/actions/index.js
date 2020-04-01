import * as LoginActions from '../../components/loginPage/LoginActions';
import * as HomeActions from '../../components/Home/HomeActions';
import * as FamilyActivitiesActions from '../../components/FamilyActivities/FamilyActivitiesActions';
import * as InformingActions from '../../components/Informing/InformingActions';
import * as MapActions from '../../components/Map/MapActions';
import * as MyActivitiesActions from '../../components/MyActivities/MyActivitiesActions';
import * as CommonActions from './CommonActions';

export const ActionCreator = Object.assign(
  {},
  LoginActions,
  HomeActions,
  FamilyActivitiesActions,
  InformingActions,
  MapActions,
  MyActivitiesActions,
  CommonActions
);
