import 'isomorphic-fetch';
import { camelizeKeys } from 'humps';

export const GET_METHOD   = 'GET';
export const PUT_METHOD   = 'PUT';
export const POST_METHOD  = 'POST';
export const CALL_API     = Symbol('Call API');
export const JSON_HEADERS = {
  'Accept'       : 'application/json',
  'Content-type' : 'application/json'
}

function callApi(action) {
  const { endpoint = '',
          root     = '/',
          payload  = {},
          query    = '',
          headers  = {},
          body     = {},
          method   = GET_METHOD } = action;

  const url = root + endpoint + '?' + query;
  const options = {
    method,
    headers,
  }

  if (method === POST_METHOD) {
    options['body'] = body;
  }

  return fetch(url, options)
  .then(response => {
    return response.json()
    .then( json => {
      return ({ json, response });
    });
  })
  .then(({ json, response }) => {
    if (!response.ok) return Promise.reject(json);
    const camelizedJson = camelizeKeys(json);
    return Object.assign({}, camelizedJson);
  });
}

export default store => dispatch => action => {
  const callApiAction = action[CALL_API];

  if (typeof callApiAction === 'undefined') {
    return dispatch(action);
  }

  const { types } = callApiAction;
  const [requestType, successType, failureType] = types;

  dispatch({
    type      : requestType,
    payload   : callApiAction
  });

  return callApi(callApiAction)
  .then(
    payload => dispatch({
      type : successType,
      payload,
    }),
    error => dispatch({
      type : failureType,
      error,
    })
  );
}
