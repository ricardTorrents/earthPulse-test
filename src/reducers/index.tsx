import { dataReducer, DataReducer } from './dataReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  data: dataReducer,
});

export type IRootReducers = {
  data: DataReducer;
};
