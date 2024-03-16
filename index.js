/**
 * @format
 */

import { Alert, AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
messaging().setBackgroundMessageHandler(async remoteMessage => {
  Alert.alert('Message handled in the background!', remoteMessage.notification.body);
});
// const onNotificationOpenedAppFromBackground = async () => {
//   const unsubscribe = messaging().onNotificationOpenedApp(
//     async remoteMessage => {
//       console.log(
//         'App opened from BACKGROUND by tapping notification:',
//         JSON.stringify(remoteMessage),
//       );
//     },
//   );
//   return unsubscribe;
// };
AppRegistry.registerComponent(appName, () => App);
