export const FETCH_REQUEST   = 'FETCH_REQUEST';
export const FETCH_SUCCESS   = 'FETCH_SUCCESS';
export const FETCH_ERROR   = 'FETCH_ERROR';

const fetchDataRequest = () => ({
  type: FETCH_REQUEST
});

const fetchDataSuccess = (payload) => ({
  type: FETCH_SUCCESS,
  payload
});

const fetchDataError = () => ({
  type: FETCH_ERROR
});

export function fetchData() {
  const URL = "/data/infected.json";
  // const URL = "https://cdn-dev.covidapp.ir/data/infected.json";
  return dispatch => {
    dispatch(fetchDataRequest());
    return fetch(URL)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchDataSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchDataError(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}