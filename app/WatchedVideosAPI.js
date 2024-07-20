
// WatchedVideosAPI.js
import axios from 'axios';

const API_URL = 'https://schools.fabulearn.net/api/bliss';


export const fetchVideoDetails = async (videoId) => {
  try {
    const response = await axios.get(`https://schools.fabulearn.net/api/bliss/videos/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
};

export const recordWatchedVideo = async (videoId, tabID, fetchHistoryVideos) => {
  try {
    const url = `${API_URL}/videos/${videoId}/trace?tabID=${tabID}`;
    const body = new FormData();
    body.append("action", "access");
    body.append("time", -1);

    console.log('Sending request to:', url);
    console.log('Request data:', body);

    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Server response:', response.data);

    if (typeof document !== 'undefined' && response.headers['set-cookie']) {
      document.cookie = response.headers['set-cookie'].split(';')[0];
      console.log('Set cookie:', document.cookie);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
    throw error;
  }
}
