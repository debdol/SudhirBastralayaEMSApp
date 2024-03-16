import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import History from '../../Pages/History';
import MyAttendance from '../../Components/MyAttendance';

const Stack = createNativeStackNavigator();

const HistoryStackScreen = () => {
    return (
        <Stack.Navigator initialRouteName='History'>
            <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
            <Stack.Screen name="MyAttendance" component={MyAttendance} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})
export default HistoryStackScreen
