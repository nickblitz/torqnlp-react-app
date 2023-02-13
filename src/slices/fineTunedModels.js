/**
 * FineTunedModel slice
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { fineTunedModelApi } from '../api/fineTunedModel';
import objFromArray from '../utils/objFromArray';
import { defaultInitialState } from '../utils/reducerInitialState';
import { reducerStatus } from '../constants/reducer';

const initialState = defaultInitialState({
  results: {
    byId: {},
    allIds: [],
  },
  params: {
    page: 0,
  },
  count: 0,
});

export const list = createAsyncThunk(
  'fineTunedModel/list',
  async (data) => {
      return await fineTunedModelApi.list(data);
});

export const completions = createAsyncThunk(
  'fineTunedModel/completion',
  async ({ data, modelId}) => {
      return await fineTunedModelApi.completions(data, modelId);
});

const slice = createSlice({
  name: 'fineTunedModel',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // list fineTunedModels
      .addCase(list.pending, (state, action) => {
        state.status = reducerStatus.loading;
      })
      .addCase(list.fulfilled, (state, action) => {
        state.status = reducerStatus.succeeded;
        const results = get(action, 'payload.results', []);
        state.results.byId = objFromArray(results);
        state.results.allIds = results.map(r => r.id);
        state.params = get(action, 'meta.arg', {});
        state.count = get(action, 'payload.count', 0);
      })
      .addCase(list.rejected, (state, action) => {
        state.status = reducerStatus.failed;
        state.error = action.error.message;
      })
  }
});

export const { reducer } = slice;

