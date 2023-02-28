import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import applyInteceptor from './utils/interceptor';

const root = ReactDOM.createRoot(document.getElementById('root'));

applyInteceptor(store);

root.render(
  <>
    {/* <React.StrictMode> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </React.StrictMode> */}
  </>
);
