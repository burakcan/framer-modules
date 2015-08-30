import { createStore, applyMiddleware, combineReducers } from 'redux';
import apiMiddleware from 'middleware/api';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import modulesReducer from 'reducers/modules';

const reducer = combineReducers({
  modules : modulesReducer
});

const createStoreWithMiddleWare = applyMiddleware(
  thunkMiddleware, apiMiddleware, loggerMiddleware
)(createStore);

export default initialState => {
  return createStoreWithMiddleWare(reducer, {});
}
