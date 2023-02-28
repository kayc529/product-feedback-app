import customFetch from './customFetch';
import { removeUserInLocalStorage } from './localStorageHelper';

const applyInteceptor = (store) => {
  // customFetch.interceptors.request.use((request)=>{
  // })
  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      //invalid token
      if (error.response.status === 401) {
        removeUserInLocalStorage();
      }
      return Promise.reject(error);
    }
  );
};

export default applyInteceptor;
