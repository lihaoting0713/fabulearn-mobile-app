// app/contexts/VideoContext.js
import React, { createContext, useState, useEffect } from 'react';

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {

  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    console.log('VideoContext videoId1:', videoId);
  }, [videoId]);

  return (
    <VideoContext.Provider value={{ videoId, setVideoId }}>
      {children}
    </VideoContext.Provider>
  );
}
