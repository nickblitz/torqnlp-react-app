import { combineReducers } from '@reduxjs/toolkit';
import { reducer as fineTunedModelReducer } from '../slices/fineTunedModels';

const rootReducer = combineReducers({
  fineTunedModels: fineTunedModelReducer,
});

export default rootReducer;
