import * as ActionTypes from "../../redux/actions/ActionTypes";
const initialState = {
    eventResult:JSON.parse(localStorage.getItem("eventResult")),
    eventCounter:localStorage.getItem("eventCounter") || 0,
    showNavBar:true,

}

export const MyActivitiesReducer = (state = initialState , action) => {
    switch (action.type) {
        case ActionTypes.SAVE_SUCCESS_EVENT_RESPONSE_TO_STATE:
            return {
                ...state,
                eventResult:action.eventResult
            }
        default: return state;
    }
}