/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import PageContainer from './src/navigation/App';
AppRegistry.registerComponent(appName, () => PageContainer);
