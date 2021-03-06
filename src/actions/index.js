import { POST_METHOD, GET_METHOD, CALL_API } from 'middleware/api';

export const FETCH_MODULES_REQUEST = 'FETCH_MODULES_REQUEST';
export const FETCH_MODULES_SUCCESS = 'FETCH_MODULES_SUCCESS';
export const FETCH_MODULES_ERROR   = 'FETCH_MODULES_ERROR';

export function fetchModules() {
  return {
    [CALL_API] : {
      types    : [FETCH_MODULES_REQUEST, FETCH_MODULES_SUCCESS, FETCH_MODULES_ERROR],
      root     : 'https://raw.githubusercontent.com/interacthings/framer-modules-list/master/',
      endpoint : 'modules.json?'+Date.now(),
    }
  }
}


export const SEARCH_MODULE = 'SEARCH_MODULE';

export function searchModule(searchTerm) {
  return {
    type      : SEARCH_MODULE,
    payload   : searchTerm
  }
}
