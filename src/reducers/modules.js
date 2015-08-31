import * as ActionTypes from 'actions';
import lunr from 'lunr';

function createSearchIndex() {
  return lunr(function(){
    this.field('name');
    this.field('description');
    this.field('url');
    this.field('demo');
    this.ref('id');
    this.pipeline.remove(this.stemmer);
  });
}

function addIndexes(items, state) {
  const { index } = state.search;

  for (const id in items) {
    const item = items[id];
    index.add({
      id          : id,
      name        : item.name,
      description : item.description
    });
  }
}

function search(searchTerm, state) {
  const { index } = state.search;
  const lunrResult = index.search(searchTerm);
  const result = {};

  lunrResult.forEach((item) => {
    result[item.ref] = state.modules[item.ref];
  });

  return result;
}

const initialState = {
  loading   : true,
  modules   : {},
  search    : {
    focused : false,
    term    : null,
    result  : null,
    index   : createSearchIndex()
  }
}

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case ActionTypes.FETCH_MODULES_SUCCESS:
      const modules = action.payload;
      addIndexes(modules, newState);
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
