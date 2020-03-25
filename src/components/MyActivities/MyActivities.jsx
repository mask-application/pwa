import React from "react";
import { useSelector, useDispatch } from "react-redux";

import NotSignedUp from './pages/NotSignedUp/NotSignedUp';
import SignUp from './pages/SignUp/SignUp';
import Activation from './pages/Activation/Activation';

import {
    showSignUpPage,
    showNotSignedUpPage,
    showActivationPage,
    activateUser,
} from "./MyActivitiesActions";

export default function MyActivities() {
    const state = useSelector(store => store.MyActivities);
    const dispatch = useDispatch();

    switch (state.page) {
        case 'INDEX':
            return <div>شما وارد شدید!</div>;
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
                    onActivate={(token) => dispatch(activateUser(token))}
                />
            );
        default:
            return null;
    }
}
