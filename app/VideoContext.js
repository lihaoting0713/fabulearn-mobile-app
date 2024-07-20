import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

const VideoContext = createContext();

export const useVideoContext = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
  const [watchHistoryVideos, setWatchHistoryVideos] = useState([]);

  const fetchHistoryVideos = useCallback(async () => {
    try {
      const url = `https://schools.fabulearn.net/api/bliss/history-videos`;
      const response = await axios.get(url);
      const data = response.data;

      if (data.success) {
        const videos = Object.values(data.data);
        setWatchHistoryVideos(videos);
      } else {
        console.error('Failed to fetch history video data:', data);
      }
    } catch (error) {
      console.error('Error fetching history video data:', error.message);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    }
  }, []);

  return (
    <VideoContext.Provider value={{ watchHistoryVideos, fetchHistoryVideos }}>
      {children}
    </VideoContext.Provider>
  );
};
