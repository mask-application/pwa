export const FETCH_MAP_REQUEST = 'FETCH_MAP_REQUEST';
export const FETCH_MAP_SUCCESS = 'FETCH_MAP_SUCCESS';
export const FETCH_MAP_ERROR = 'FETCH_MAP_ERROR';
export const FETCH_PRIVATE_MAP_REQUEST = 'FETCH_PRIVATE_MAP_REQUEST';
export const FETCH_PRIVATE_MAP_SUCCESS = 'FETCH_PRIVATE_MAP_SUCCESS';
export const FETCH_PRIVATE_MAP_ERROR = 'FETCH_PRIVATE_MAP_ERROR';

const fetchMapRequest = () => {
  return {
    type: FETCH_MAP_REQUEST,
  };
};
const fetchMapSuccess = (payload) => {
  return {
    type: FETCH_MAP_SUCCESS,
    payload,
  };
};
const fetchMapError = () => {
  return {
    type: FETCH_MAP_ERROR,
  };
};

export const fetchMaps = () => (dispatch) => {
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

const fetchPrivateMapRequest = () => {
  return {
    type: FETCH_PRIVATE_MAP_REQUEST,
  };
};
const fetchPrivateMapSuccess = (payload) => {
  return {
    type: FETCH_PRIVATE_MAP_SUCCESS,
    payload,
  };
};
const fetchPrivateMapError = () => {
  return {
    type: FETCH_PRIVATE_MAP_ERROR,
  };
};

export const fetchPrivateMaps = (token) => (dispatch) => {
  dispatch(fetchPrivateMapRequest());
  return fetch(`${process.env.REACT_APP_GET_PRIVATE_MAPS}`, {
    headers: {
      'Access-Token': token,
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch(fetchPrivateMapSuccess(responseJson.list));
    })
    .catch((error) => {
      dispatch(fetchPrivateMapError());
    });
};
