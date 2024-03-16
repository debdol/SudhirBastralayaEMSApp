import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from '../../Pages/Component/LogIn';
import ForgotPassWord from '../../Pages/Component/ForgotPassWord';
import SendOtp from '../../Pages/Component/SendOtp';
import SetPassword from '../../Pages/Component/SetPassword';


const Stack = createNativeStackNavigator();

const LogInStackScreens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LogIn'>
        <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} options={{ headerShown: false }} />
        <Stack.Screen name="SendOtp" component={SendOtp} options={{ headerShown: false }} />
        <Stack.Screen name="SetPassword" component={SetPassword} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default LogInStackScreens;