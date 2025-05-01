
import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './slices/apiSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    auth:userReducer,
    [apiSlice.reducerPath]:apiSlice.reducer
  },
  middleware:(getDefaultMiddlware)=>getDefaultMiddlware().concat(apiSlice.middleware),
  devTools:true
});
export default store
