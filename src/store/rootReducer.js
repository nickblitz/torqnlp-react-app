import { combineReducers } from '@reduxjs/toolkit';
import { reducer as itemsExampleReducer } from '../slices/itemsExample';

const rootReducer = combineReducers({
  itemsExample: itemsExampleReducer,
});

export default rootReducer;
