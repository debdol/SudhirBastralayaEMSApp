import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalData } from '../../App';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../../Pages/Home';
import Account from '../../Pages/Account';
import Profile from '../../Pages/Profile';
import Notification from '../../Pages/Notification';
import HistoryStackScreen from '../HistoryStackScreen/HistoryStackScreen';


const Tab = createBottomTabNavigator();

const BottomNavigationScreens = () => {
    const { postPageName, getPageName, postNotificationCounts } = useContext(GlobalData)
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                height: "9%",
                width: "100%",
                borderBottomRightRadius: 9,
                borderBottomLeftRadius: 9,
            },
            headerShown: false,
            tabBarHideOnKeyboard: true,
        }}>
            <Tab.Screen name="Home" component={Home} options={
                (({ navigation }) => ({
                    tabBarButton: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("Home");
                            getPageName("home");
                        }} style={[styles.bottomBtn]}>
                            <View style={postPageName === "home" ? styles.focusedMainBottomBtn : null}>
                                <AntDesign name='home' size={25} style={[postPageName === "home" ? styles.focusedBottomBtnIcon : styles.bottomBtnIcon]} />
                            </View>
                        </TouchableOpacity>
                    )
                }))
            } />
            <Tab.Screen name="HistoryStackScreen" component={HistoryStackScreen} options={
                (({ navigation }) => ({
                    tabBarButton: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("HistoryStackScreen");
                            getPageName("history");
                        }} style={[styles.bottomBtn]}>
                            <View style={postPageName === "history" ? styles.focusedMainBottomBtn : null}>
                                <Feather name='clock' size={25} style={[postPageName === "history" ? styles.focusedBottomBtnIcon : styles.bottomBtnIcon]} />
                            </View>
                        </TouchableOpacity>
                    )
                }))
            } />
            <Tab.Screen name="Notification" component={Notification} options={
                (({ navigation }) => ({
                    tabBarButton: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("Notification");
                            getPageName("notifications");
                        }} style={[styles.bottomBtn]}>
                            <View style={postPageName === "notifications" ? styles.focusedMainBottomBtn : {
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 50,
                                width: 50,
                            }}>
                                <Fontisto name='bell' size={25} style={[postPageName === "notifications" ? styles.focusedBottomBtnIcon : styles.bottomBtnIcon]} />
                                {postNotificationCounts ? (<Text style={[styles.notificationTxt]}>{postNotificationCounts}</Text>) : null}
                            </View>
                        </TouchableOpacity>
                    )
                }))
            } />
            <Tab.Screen name="Account" component={Account} options={
                (({ navigation }) => ({
                    tabBarButton: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("Account");
                            getPageName("account");
                        }} style={[styles.bottomBtn]}>
                            <View style={postPageName === "account" ? styles.focusedMainBottomBtn : null}>
                                <Ionicons name='wallet-outline' size={25} style={[postPageName === "account" ? styles.focusedBottomBtnIcon : styles.bottomBtnIcon]} />
                            </View>
                        </TouchableOpacity>
                    )
                }))
            } />
            <Tab.Screen name="Profile" component={Profile} options={
                (({ navigation }) => ({
                    tabBarButton: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("Profile");
                            getPageName("profile");
                        }} style={[styles.bottomBtn]}>
                            <View style={postPageName === "profile" ? styles.focusedMainBottomBtn : null}>
                                <AntDesign name='user' size={25} style={[postPageName === "profile" ? styles.focusedBottomBtnIcon : styles.bottomBtnIcon]} />
                            </View>
                        </TouchableOpacity>
                    )
                }))
            } />
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    bottomBtn: {
        // borderColor: "red",
        // borderWidth: 1,
        width: "20%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    focusedMainBottomBtn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: "#DFE5EE",
        // borderWidth: 1,
    },
    focusedBottomBtnIcon: {
        color: "rgba(0, 71, 67, 0.7)",
    },
    bottomBtnIcon: {
        color: "#000000"
    },
    notificationTxt: {
        // borderColor: "red",
        // borderWidth: 1,
        position: "absolute",
        top: 0,
        right: 0,
        height: 20,
        width: 20,
        borderRadius: 10,
        fontWeight: "600",
        textAlign: "center",
        backgroundColor: "red",
        color: "white"
    }
})
export default BottomNavigationScreens;