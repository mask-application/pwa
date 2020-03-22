const initialState = {
    test:true
}

export const FamiliesActivitiesReducer = (state = initialState , action) => {
    switch (action.type) {
        case "test":
            return {
                ...state,
                test:false
            }
        default: return state;
    }
}