/**
 * @format
 */

 import {name as appName} from './app.json';
import {AppRegistry} from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store'
import App from './App';

const RNRedux = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => RNRedux);