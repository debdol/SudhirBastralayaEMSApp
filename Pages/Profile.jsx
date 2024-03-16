import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalData } from '../App'

import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Loading from '../Components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userDataFunction } from '../Functions/Functions';

const Profile = ({ navigation }) => {
  const { getPageName, getUserToken, postUserToken } = useContext(GlobalData);
  const [userData, setuserData] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPageName("profile");
      userDataHandler();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const userDataHandler = () => {
    if (postUserToken) {
      const temp = userDataFunction(postUserToken)
        .then((response) => {
          setuserData(response.data.employee);
        })
        .catch((error) => { "error_in_show_employee_data:", console.log(error) })
    }
  }
  useEffect(() => {
    userDataHandler()
  }, []);

  if (userData) {
    return (
      <View style={styles.mainContainer}>
        <Text style={[styles.todayTxt, { color: "black", alignSelf: "center", fontFamily: "MontserratAlternates-Bold" }]}>Profile</Text>
        <View style={{ alignSelf: "center", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
          <Text style={[styles.profileImg, { width: 85 }]} ></Text>
          {userData.image ? <Image source={{ uri: userData.profile_image.path }} style={styles.profileImg} /> : null}
          <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate("EditProfile", { userData: userData })}>
              <AntDesign name='edit' size={20} style={{ color: "white" }} />
            </TouchableOpacity>
            <Text style={[styles.todayTxt, { color: "black", alignSelf: "center", fontWeight: "500", fontSize: 15, fontFamily: "MontserratAlternates-Regular" }]}>Edit Profile</Text>
          </View>
        </View>
        <Text style={[styles.todayTxt, { color: "black", alignSelf: "center", fontFamily: "MontserratAlternates-Regular" }]}>{userData.name}</Text>
        <View style={styles.infoView}>
          <Text style={[styles.todayTxt, { color: "black", fontSize: 17, fontFamily: "MontserratAlternates-Bold" }]}>My Info</Text>
          <View style={styles.lebelAndDataView}>
            <View style={styles.lebelAndIconView}>
              <Feather name='phone-call' style={styles.icon} size={17} />
              <Text style={[styles.todayTxt, { color: "black", fontSize: 15, fontFamily: "MontserratAlternates-Regular" }]}>Phone</Text>
            </View>
            <Text style={[styles.todayTxt, { color: "black", fontSize: 15, }]}>{userData.number}</Text>
          </View>
          <View style={styles.lebelAndDataView}>
            <View style={styles.lebelAndIconView}>
              <Fontisto name='email' style={styles.icon} size={17} />
              <Text style={[styles.todayTxt, { color: "black", fontSize: 15, fontFamily: "MontserratAlternates-Regular" }]}>Email</Text>
            </View>
            <Text style={[styles.todayTxt, { color: "black", fontSize: 15, }]}>{userData.email}</Text>
          </View>
          <View style={styles.lebelAndDataView}>
            <View style={styles.lebelAndIconView}>
              <Entypo name='location-pin' style={styles.icon} size={17} />
              <Text style={[styles.todayTxt, { color: "black", fontSize: 15, fontFamily: "MontserratAlternates-Regular" }]}>Address</Text>
            </View>
            <Text style={[styles.todayTxt, { color: "black", fontSize: 15, }]}>{userData.address}</Text>
          </View>
          <View style={styles.lebelAndDataView}>
            <View style={styles.lebelAndIconView}>
              <Ionicons name='wallet-outline' style={styles.icon} size={17} />
              <Text style={[styles.todayTxt, { color: "black", fontSize: 15, fontFamily: "MontserratAlternates-Regular" }]}>salary</Text>
            </View>
            <Text style={[styles.todayTxt, { color: "black", fontSize: 15, }]}>{userData.salary}</Text>
          </View>
          <View style={styles.lebelAndDataView}>
            <View style={styles.lebelAndIconView}>
              <AntDesign name='link' style={styles.icon} size={17} />
              <Text style={[styles.todayTxt, { color: "black", fontSize: 15, fontFamily: "MontserratAlternates-Regular" }]}>Joined At</Text>
            </View>
            <Text style={[styles.todayTxt, { color: "black", fontSize: 15, }]}>{userData.registered_at.split("T")[0]}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editProfile} onPress={async () => {
          await AsyncStorage.removeItem("user_token");
          getUserToken(null);
        }}>
          <Text style={[styles.todayTxt, { color: "white", textAlign: "center", textAlignVertical: "center", height: "100%", fontFamily: "MontserratAlternates-Bold" }]}>Log Out</Text>
        </TouchableOpacity>
      </View >
    )
  } else {
    return (<Loading />)
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // borderColor:"red",
    // borderWidth:1,
    flexDirection: "column",
    gap: 20,
    padding: 20
  },
  todayTxt: {
    fontSize: 20,
    color: "#05ACFA"
  },
  profileImg: {
    height: 90,
    width: 90,
    borderRadius: 45
  },
  editBtn: {
    backgroundColor: "rgba(0, 71, 67, 0.7)",
    padding: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  infoView: {
    borderColor: "#E0EAEF",
    borderWidth: 2,
    borderRadius: 9,
    flexDirection: "column",
    gap: 16,
    padding: 10
  },
  lebelAndDataView: {
    flexDirection: "column",
    gap: 4,
  },
  lebelAndIconView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  icon: {
    color: "black"
  },
  editProfile: {
    // borderColor:"red",
    // borderWidth:1,
    borderRadius: 35,
    // padding: 6,
    height: 50,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "rgba(0, 71, 67, 0.7)",
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    bottom: 6,
    position: "absolute"
  }
})
export default Profile