import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from '../reducers';
import { createLogger } from "redux-logger";
const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk, promiseMiddleware(),createLogger()),
  )
);


export default store;