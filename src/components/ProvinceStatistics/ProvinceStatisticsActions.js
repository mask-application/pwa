function fetchDataRequest(){
  return {
    type: "FETCH_REQUEST"
  }
}

function fetchDataSuccess(payload) {
  return {
    type: "FETCH_SUCCESS",
    payload
  }
}

function fetchDataError() {
  return {
    type: "FETCH_ERROR"
  }
}

export function fetchProvinceData() {
  return (dispatch) => {
    dispatch(fetchDataRequest());
    return fetchData().then(([response, json]) =>{
      if(response.status === 200){
        dispatch(fetchDataSuccess(json))
      }
      else{
        dispatch(fetchDataError())
      }
    })
  }
}

function fetchData() {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  return fetch(URL, { method: 'GET'})
    .then( response => Promise.all([response, response.json()]));
}