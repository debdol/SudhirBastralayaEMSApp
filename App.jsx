import React, { useState, createContext, useEffect } from 'react';
import { useColorScheme, LogBox, Alert, PermissionsAndroid } from 'react-native';
export const GlobalData = createContext();
LogBox.ignoreAllLogs();
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllPage from './Components/AllPage';
import LogInStackScreens from './Navigation/LogInStackScreens/LogInStackScreens';
import Loading from './Components/Loading';
import messaging from '@react-native-firebase/messaging';
import { userAttenDanceFunction, userNotificationFunction } from './Functions/Functions';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [pageName, setPageName] = useState("home");
  const [mainPage, setMainPage] = useState(<Loading />);
  const [userToken, setUserToken] = useState(null);
  const [attedance, setAttedance] = useState(null);
  const [notificationCounts, setNotificationCounts] = useState(0);
  const [notificationArray, setNotificationArray] = useState();
  const [singleNotification, setSingleNotification] = useState();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(JSON.stringify(remoteMessage.notification.body));
      setSingleNotification(JSON.stringify(remoteMessage.notification.body))
    });
    return unsubscribe;
  }, []);
  const onNotificationOpenedAppFromBackground = async () => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        setSingleNotification(JSON.stringify(remoteMessage.notification.body))
      },
    );
    return unsubscribe;
  };
  useEffect(() => {
    SplashScreen.hide();
    onNotificationOpenedAppFromBackground();
  }, []);

  const getUserTokenHanlder = async () => {
    if (await AsyncStorage.getItem('user_token')) {
      setUserToken(await AsyncStorage.getItem('user_token'));
      // AsyncStorage.removeItem("user_token");
    } else {
      setMainPage(<LogInStackScreens />);
    }
  };

  //For Notifications....................................
  const notificationHandler = (userToken) => {
    const temp = userNotificationFunction(userToken)
      .then((response) => {
        setNotificationArray(response.data);
        // console.log(response.data);
        setNotificationCounts(response.data.length);
      })
      .catch((error) => { console.log("errror:", error.response.data) })
  }
  useEffect(() => {
    if (singleNotification) {
      if (userToken) {
        notificationHandler(userToken);
      }
    }
  }, [singleNotification])

  useEffect(() => {
    if (userToken) {
      const temps = userAttenDanceFunction(userToken)
        .then((response) => {
          setMainPage(<AllPage />);
        })
        .catch((error) => { console.log("error_in_userattendance:", error.response.data) })
    } else {
      getUserTokenHanlder();
    }
  }, [userToken])

  return (
    <GlobalData.Provider value={{
      //send data
      postPageName: pageName,
      postUserToken: userToken,
      postAttedance: attedance,
      postNotificationArray: notificationArray,
      postNotificationCounts: notificationCounts,
      //get data
      getPageName: setPageName,
      getMainPage: setMainPage,
      getUserToken: setUserToken,
      getNotificationArray: setNotificationArray,
      getNotificationCounts: setNotificationCounts
    }}>
      {mainPage}
      {/* <AllPage/> */}
    </GlobalData.Provider>
  );
}

export default App;
