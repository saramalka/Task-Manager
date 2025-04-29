
import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './slices/apiSlice';


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]:apiSlice.reducer
  },
  middleware:(getDefaultMiddlware)=>getDefaultMiddlware().concat(apiSlice.middleware),
  devTools:false
});
export default store
