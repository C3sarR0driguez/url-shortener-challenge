import { combineReducers } from 'redux';
import url from './urlReducer';
import hash from './hashReducer';
import ui from './uiReducer';
export default combineReducers({
  url,
  ui,
  hash
});
