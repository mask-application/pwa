import * as ActionTypes from '../../redux/actions/ActionTypes';
import { MyHealthEventConsts } from '../../constants/MyHealthEventConsts';
import { showNav } from '../../redux/actions/CommonActions';

export function showSignUpPage() {
  return {
    type: 'SHOW_SIGN_UP_PAGE',
  };
}

export function showNotSignedUpPage() {
  return {
    type: 'SHOW_NOT_SIGNED_UP_PAGE',
  };
}

export function showActivationPage({ phone, condition, ttl }) {
  return {
    type: 'SHOW_ACTIVATION_PAGE',
    phone,
    condition,
    ttl,
  };
}

export function activateUser({ token, user }) {
  return {
    type: 'ACTIVATE_USER',
    token,
    user,
  };
}

export const createHealthEvent = (data, history) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SHOW_HEALTH_EVENT_LOADING });

    let indexedData = {
      version: process.env.REACT_APP_VERSION,
      fever: MyHealthEventConsts.fever.indexOf(data.fever),
      sore_throat: MyHealthEventConsts.soreThroat.indexOf(data.sore_throat),
      dry_cough: MyHealthEventConsts.dryCough.indexOf(data.dry_cough),
      shortness_of_breath: MyHealthEventConsts.holdingThe‌ٰ‌‌‌‌Breath.indexOf(
        data.shortness_of_breath
      ),
      breath_rate: MyHealthEventConsts.breathrate.indexOf(data.breath_rate),
      nasal_congestion: MyHealthEventConsts.adenoid.indexOf(
        data.nasal_congestion
      ),
      body_pain: MyHealthEventConsts.bodyPain.indexOf(data.body_pain),
      runny_nose: MyHealthEventConsts.runnynose.indexOf(data.runny_nose),
      sneeze: MyHealthEventConsts.sneeze.indexOf(data.sneeze),
      headache: MyHealthEventConsts.headache.indexOf(data.headache),
      lethargy: MyHealthEventConsts.inaction.indexOf(data.lethargy),
    };
    let now = new Date();

    createEventInBulk(
      0,
      indexedData,
      getState().MyActivities.user.people[0].id,
      getState().MyActivities.token,
      now
    )
      .then((response) => {
        if (response.status == 201) {
          //FIXME:باید به صورت یک آبجکت ذخیره گردد
          localStorage.setItem('myHealthFever', data.fever);
          localStorage.setItem('myHealthSoreThroat', data.sore_throat);
          localStorage.setItem('myHealthDryCough', data.dry_cough);
          localStorage.setItem(
            'myHealthShortnessOfBreath',
            data.shortness_of_breath
          );
          localStorage.setItem('myHealthBreathRate', data.breath_rate);
          localStorage.setItem(
            'myHealthNasalCongestion',
            data.nasal_congestion
          );
          localStorage.setItem('myHealthIBodyPain', data.body_pain);
          localStorage.setItem('myHealthIRunnyNose', data.runny_nose);
          localStorage.setItem('myHealthSneeze', data.sneeze);
          localStorage.setItem('myHealthIHeadache', data.headache);
          localStorage.setItem('myHealthLethargy', data.lethargy);

          localStorage.setItem('eventResult', JSON.stringify(response.data));
          localStorage.setItem('create_time', now);
          if (getState().MyActivities.firstCreateTime === null) {
            localStorage.setItem('first_create_time', now);
          }

          localStorage.setItem(
            'eventCounter',
            +getState().MyActivities.eventCounter + 1
          );
          dispatch({
            type: ActionTypes.SAVE_SUCCESS_EVENT_RESPONSE_TO_STATE,
            eventResult: response.data,
            eventCounter: +getState().MyActivities.eventCounter + 1,
            createTime: now,
          });
          dispatch(showNav());

          history.push('/my-activities');
        } else if (response.status == 400) {
          //TODO:باید پیاده سازی شود
          throw response;
        } else if (response.status == 401) {
          //TODO:باید پیاده سازی شود
          throw response;
        }
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.ERROR_IN_HEALTH_EVENT_API,
        });
      });
  };
};

export const createQrEvent = (data, history) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.ADD_MEETING_EVENT_REQUEST });

    let now = new Date();

    createEventInBulk(
      1,
      data,
      getState().MyActivities.user.people[0].id,
      getState().MyActivities.token,
      now
    )
      .then((response) => {
        if (response.status === 201) {
          dispatch({
            type: ActionTypes.ADD_MEETING_EVENT_SUCCESS,
            eventResult: response.data,
            eventCounter: +getState().MyActivities.eventCounter + 1,
            createTime: now,
          });
          dispatch(showNav());

          history.push('/my-activities');
        } else {
          //TODO:باید پیاده سازی شود
          throw response;
        }
      })
      .catch(() => {
        dispatch({
          type: ActionTypes.ADD_MEETING_EVENT_FAILURE,
        });
      });
  };
};

export const createQrPlaceEvent = (data, history) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.ADD_PLACE_EVENT_REQUEST });

    let now = new Date();

    console.log(now);

    createEventInBulk(
      2,
      data,
      getState().MyActivities.user.people[0].id,
      getState().MyActivities.token,
      now
    )
      .then((response) => {
        if (response.status === 201) {
          dispatch({
            type: ActionTypes.ADD_PLACE_EVENT_SUCCESS,
            eventResult: response.data,
            eventCounter: +getState().MyActivities.eventCounter + 1,
            createTime: now,
          });
          dispatch(showNav());

          history.push('/my-activities');
        } else {
          //TODO:باید پیاده سازی شود
          throw response;
        }
      })
      .catch(() => {
        dispatch({
          type: ActionTypes.ADD_PLACE_EVENT_FAILURE,
        });
      });
  };
};

const createEventInBulk = (type, data, personId, token, now) => {
  let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(now);
  let month = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(now);
  let day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(now);

  return fetch(`${process.env.REACT_APP_BULK_EVENT}`, {
    method: 'POST',
    headers: {
      'Access-Token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      events: [
        {
          person: personId,
          type: type,
          data: data,
          create_time: `${year}-${month}-${day}`, // FIXME:is format correct???
        },
      ],
    }),
  })
    .then((response) => {
      if (response.status >= 500) {
        throw response;
      } else {
        return response.json().then((res) => {
          return { status: response.status, data: res };
        });
      }
    })
    .then(async (response) => {
      return await response;
    })
    .catch((error) => {
      return error;
    });
};
