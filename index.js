'use strict';

import {AppRegistry} from 'react-native';
import App from './app/src/app/app';
import {name as appName} from './app.json';

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
