import axios from 'axios';
import applyMockAdapter from './mockAdapter';

const useMock = false;

const customFetch = axios.create({
  baseURL: 'https://product-feedback-app-server.cyclic.app/api/v1',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

if (useMock) {
  applyMockAdapter(customFetch);
}

export default customFetch;
