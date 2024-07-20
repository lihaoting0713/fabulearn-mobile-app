import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './videoSlice.js';


const store = configureStore({
  reducer: {
    video: videoReducer,
  },
});

export default store;
