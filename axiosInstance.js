import axios from 'axios';
import https from 'https';

// Create an instance of axios with a custom https agent
const instance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});

export default instance;
