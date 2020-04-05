export const FETCH_MAP_REQUEST = 'FETCH_MAP_REQUEST';
export const FETCH_MAP_SUCCESS = 'FETCH_MAP_SUCCESS';
export const FETCH_MAP_ERROR = 'FETCH_MAP_ERROR';

const fetchMapRequest = () => {
    return {
        type: FETCH_MAP_REQUEST
    }
};
const fetchMapSuccess = (payload) => {
    return {
        type: FETCH_MAP_SUCCESS,
        payload,
    }
};
const fetchMapError = () => {
    return {
        type: FETCH_MAP_ERROR
    }
};

export const fetchMap = () => dispatch => {
    dispatch(fetchMapRequest());
    return fetch(`${process.env.REACT_APP_GET_MAP_TYPE_LISTS}`)
        .then((response) => response.json())
        .then((responseJson) => {
            dispatch(fetchMapSuccess(Object.values(responseJson)[0]));
        })
        .catch((error) => {
            dispatch(fetchMapError());
        });
};
