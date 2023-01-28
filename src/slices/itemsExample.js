/**
 * This is an example of a slice that fetches a list of items from an API.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { itemExampleApi } from '../api/itemExample';
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
  'itemInstanceName/list',
  async (data) => {
      return await itemExampleApi.list(data);
  });

const slice = createSlice({
  name: 'itemInstanceName',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
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

