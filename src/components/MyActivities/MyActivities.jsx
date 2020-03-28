import React from "react";
import { useSelector, useDispatch } from "react-redux";

import NotSignedUp from './pages/NotSignedUp/NotSignedUp';
import SignUp from './pages/SignUp/SignUp';
import Activation from './pages/Activation/Activation';
import MyActiActivitiesLogined from './pages/Loggedin/MyActivitiesLogined';

import {
    showSignUpPage,
    showNotSignedUpPage,
    showActivationPage,
    activateUser,
} from "./MyActivitiesActions";

// TODO remove this useless comments and add a good explanation what does this do, dear @alimo :)
/**
 * @return {null}
 * @return {null}
 */

export default function MyActivities() {
    const state = useSelector(store => store.MyActivities);
    const dispatch = useDispatch();

    switch (state.page) {
        case 'INDEX':
            // FIXME use formattedMessage from react-intl
            return <MyActiActivitiesLogined/>;
        case 'NOT_SIGNED_UP':
            return <NotSignedUp onSignUpClick={() => dispatch(showSignUpPage())} />;
        case 'SIGN_UP':
            return (
                <SignUp
                    onBackClick={() => dispatch(showNotSignedUpPage())}
                    onSMSSent={(data) => dispatch(showActivationPage(data))}
                />
            );
        case 'ACTIVATION':
            return (
                <Activation
                    onBackClick={() => dispatch(showSignUpPage())}
                    onActivate={(data) => dispatch(activateUser(data))}
                />
            );
        default:
            return null;
    }
}
