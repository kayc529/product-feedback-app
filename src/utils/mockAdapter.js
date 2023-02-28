import MockAdapter from 'axios-mock-adapter';
import data from '../data/data.json';
import { dummyRoadmapData } from '../data/dummyData';

const applyMockAdapter = (axiosInstance) => {
  // TODO
  // check use mock from .env
  const mock = new MockAdapter(axiosInstance);
  mock.onGet('/suggestions').reply(200, data);
  mock.onGet('/roadmap').reply(200, dummyRoadmapData);
};

export default applyMockAdapter;
