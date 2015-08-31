import { createStore, applyMiddleware, combineReducers } from 'redux';
import apiMiddleware from 'middleware/api';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import modulesReducer from 'reducers/modules';

const reducer = combineReducers({
  modules : modulesReducer
});

const middlewareApplier = (process.env.NODE_ENV === 'development') ?
                          applyMiddleware(thunkMiddleware, apiMiddleware, loggerMiddleware):
                          applyMiddleware(thunkMiddleware, apiMiddleware);

const createStoreWithMiddleWare = middlewareApplier(createStore);

export default initialState => {
  return createStoreWithMiddleWare(reducer, {});
}
