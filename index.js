import {AppRegistry, Platform} from 'react-native';
import App from './app/src/app/app';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
