import axios from 'axios';
import applyMockAdapter from './mockAdapter';

const useMock = process.env.REACT_APP_USE_MOCK === 'true';

const customFetch = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_BASE_URL_PROD
      : process.env.REACT_APP_BASE_URL_DEV,
  timeout: process.env.REACT_APP_API_CALL_TIMEOUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

if (useMock) {
  applyMockAdapter(customFetch);
}

export default customFetch;
