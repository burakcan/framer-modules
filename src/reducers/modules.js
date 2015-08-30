import * as ActionTypes from 'actions';

export default (state = { _initial : true }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_MODULES_SUCCESS:
      state = action.payload;
      break;
  }
  return state;
}
