import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://64e76937b0fd9648b78feafb.mockapi.io';

// export const fetchContacts = createAsyncThunk('contacts/fetchAll', async dispatch => {
//   const response = await axios.get('/contacts');
//   console.log(response.data)
//   return response.data;
// });

export const fetchContacts = async () => {
  try {
    const response = await axios.get('/contacts');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getContacts = () => {
  return async dispatch => {
    try {
      dispatch(newSlice.actions.fetching());
      const data = await fetchContacts;
      dispatch(newSlice.actions.fetchSuccess(data));
    } catch (error) {
      dispatch(newSlice.actions.fetchError(error));
    }
  };
};

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const newSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    fetching: state => {
      state.isLoading = true;
    },
    fetchSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.items = payload;
      state.error =null;
    },
    fetchError: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});
