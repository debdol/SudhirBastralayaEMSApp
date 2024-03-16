import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import NotificationLog from '../Components/NotificationLog'
import { GlobalData } from '../App';
import Loading from '../Components/Loading';
import { useSafeAreaInsets, } from 'react-native-safe-area-context';
import { userDeleteNotificationFunction } from '../Functions/Functions';

const Notification = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { getPageName, postUserToken, getNotificationCounts, postNotificationArray, getNotificationArray } = useContext(GlobalData);
  const [notificationArray, setNotificationArray] = useState();
  const [page, setPage] = useState(<Loading />);
  const setTimeOutHandler = () => {
    let id = setTimeout(() => {
      setPage(
        <View style={[styles.mainContainer, { flex: 0 }]}>
          <Text style={[styles.todayTxt, { color: "black", alignSelf: "center", fontFamily: "MontserratAlternates-Bold" }]}>notifications</Text>
          <Text style={styles.emptyNotification}>no notifications!</Text>
        </View>
      );
    }, 2000)
  }
  useEffect(() => {
    setNotificationArray(postNotificationArray);
  }, [postNotificationArray])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPageName("notifications");
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    setTimeOutHandler();
    return unsubscribe;
  }, [navigation]);

  const deleteNotification = () => {
    setPage(<Loading />);
    let temp = userDeleteNotificationFunction(postUserToken)
      .then((response) => {
        getNotificationArray();
        getNotificationCounts();
        setTimeOutHandler();
      })
      .catch((error) => { console.log(error.response.data) })
  }

  return (
    <>
      {notificationArray ?
        <View style={[styles.mainContainer, {
          // paddingTop: insets.top,
          paddingBottom: insets.bottom,
          // paddingLeft: insets.left,
          // paddingRight: insets.right,
        }]}>
          <Text style={[styles.todayTxt, { color: "black", alignSelf: "center", fontFamily: "MontserratAlternates-Bold" }]}>Notifications</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {notificationArray.map((item, index) => {
              return (
                <NotificationLog item={item} index={index} key={index} />
              );
            })}
          </ScrollView>
          <TouchableOpacity style={styles.cleanBtn} onPress={() => deleteNotification()}>
            <Text style={[styles.todayTxt, { fontSize: 14, color: "white", fontFamily: "MontserratAlternates-Bold" }]}>Clean</Text>
          </TouchableOpacity>
        </View> : page}
    </>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 20,
    padding: 20,
    // borderWidth:1
  },
  todayTxt: {
    fontSize: 20,
    fontFamily: "Forza-Bold",
    color: "#05ACFA"
  },
  cleanBtn: {
    position: "absolute",
    zIndex: 0,
    // left:0,
    top: "93%",
    right: 5,
    backgroundColor: "#004743",
    borderColor: "#004743",
    borderWidth: 1,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: "center",
    // borderRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    alignItems: "center",
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  emptyNotification: {
    // flex:1,
    color: "black",
    alignSelf: "center",
    height: "80%",
    textAlignVertical: "center",
    // borderColor:"red",
    // borderWidth:1,
    justifyContent: "center",
    fontFamily: "MontserratAlternates-Bold",
    fontSize: 40,
  }
})
export default Notification