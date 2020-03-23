const initialState = {
    test:true
}

export const FamilyActivitiesReducer = (state = initialState , action) => {
    switch (action.type) {
        case "test":
            return {
                ...state,
                test:false
            }
        default: return state;
    }
}