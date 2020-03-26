// TODO Explain about it - what is this token for?
const token = localStorage.getItem('token');

const initialState = {
    token,
    page: token ? 'INDEX' : 'NOT_SIGNED_UP',
    phone: null,
    condition: null,
    ttl: null,
};

export function MyActivitiesReducer(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_SIGN_UP_PAGE':
            return {
                ...state,
                page: 'SIGN_UP',
            };
        case 'SHOW_NOT_SIGNED_UP_PAGE':
            return {
                ...state,
                page: 'NOT_SIGNED_UP',
            };
        case 'SHOW_ACTIVATION_PAGE':
            return {
                ...state,
                page: 'ACTIVATION',
                phone: action.phone,
                condition: action.condition,
                ttl: action.ttl,
            };
        case 'ACTIVATE_USER':
            localStorage.setItem('token', action.token);
            return {
                ...state,
                page: 'INDEX',
                token: action.token,
            };
        default:
            return state;
    };
}
