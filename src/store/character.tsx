import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { contentTypes, builderTypes } from '../pages/types/disneyCharactersTypes.tsx';

import api from '../api/api.ts';

const PATH = '/character';

const initialState = {
  contents: [],
  isLoading: false,
  error: null,
};

export const getCharacters = createAsyncThunk<Array<object>, object>(
  'characters/getCharacters',
  async (params: object) => {
    const response = await api.get(`${[PATH]}`, { params });

    return response.data;
  }
);

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: (builder: builderTypes) => {
    builder.addCase(getCharacters.pending, (state: contentTypes) => {
      state.isLoading = true;
    });
    builder.addCase(getCharacters.fulfilled, (state: contentTypes, action: any) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(getCharacters.rejected, (state: contentTypes, action: any) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default contentSlice.reducer;
