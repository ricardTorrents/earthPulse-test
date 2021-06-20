import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import InitialDataLoader from '../components/InitialDataLoader';
import combineReducers from '../reducers';
import '../styles/global.scss';
const store = createStore(combineReducers, applyMiddleware(thunkMiddleware));
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <InitialDataLoader />
    </Provider>
  );
}

export default MyApp;
