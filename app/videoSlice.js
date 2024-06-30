// app/videoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const videoSlice = createSlice({
  name: 'video',
  initialState: {
    videoId: null,
  },
  reducers: {
    setVideoId: (state, action) => {
      state.videoId = action.payload;
    },
  },
});

export const { setVideoId } = videoSlice.actions;

export default videoSlice.reducer;
