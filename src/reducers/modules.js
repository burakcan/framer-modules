import * as ActionTypes from 'actions';

function search(searchTerm, state) {
  const { modules } = state;
  const result      = {};

  for (const id in modules) {
    const item = modules[id];
    const { description, name } = item;

    if (searchTerm != null && (
       (description && description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
       (name && name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1))) {
      result[id] = item;
    }
  }

  return result;
}

export const initialState = {
  loading   : true,
  modules   : {},
  search    : {
    focused : false,
    term    : null,
    result  : null
  }
}

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case ActionTypes.FETCH_MODULES_SUCCESS:
      const modules = action.payload;
      newState.modules = modules;
      newState.loading = false;
      break;

    case ActionTypes.SEARCH_MODULE:
      const searchTerm = (action.payload === '') ? null : action.payload;
      newState.search.term   = searchTerm;
      newState.search.result = search(searchTerm, newState);
      break;

    case ActionTypes.SEARCH_FOCUS:
      newState.search.focused = true;
      break;

    case ActionTypes.SEARCH_BLUR:
      newState.search.focused = false;
      break;
  }

  return newState;
}
