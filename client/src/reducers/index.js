// rootReducer.js
import { combineReducers } from 'redux';
import {userReducer} from './userReducer'; // Default import is correct for your `userSlice` export

const rootReducer = combineReducers({
  user: userReducer,  // Combine the userReducer into the store
});

export default rootReducer;
