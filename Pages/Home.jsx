import { StyleSheet, Text, TouchableOpacity, View, RefreshControl, ScrollView, FlatList } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import EmplyeeCheckStausHomePage from '../Components/EmplyeeCheckStausHomePage';
import { GlobalData } from '../App';
import { userNotificationFunction } from '../Functions/Functions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Loading from '../Components/Loading';

const Home = ({ navigation }) => {
  const { getPageName, postAttedance, postUserToken, getNotificationArray, getNotificationCounts } = useContext(GlobalData);
  const [attendance, setAttendance] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPageName("home");
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    if (postAttedance) {
      setAttendance(postAttedance);
    }
  }, [postAttedance]);

  const statusLog = [
    {
      checkIn: "10am",
      checkOut: "5pm",
      totalHr: "7",
      totalAmount: "400"
    },
    {
      checkIn: "10am",
      checkOut: "6pm",
      totalHr: "8",
      totalAmount: "500"
    },
    {
      checkIn: "10am",
      checkOut: "9pm",
      totalHr: "9",
      totalAmount: "600"
    },
    {
      checkIn: "10am",
      checkOut: "10pm",
      totalHr: "10",
      totalAmount: "700"
    },
    {
      checkIn: "10am",
      checkOut: "10pm",
      totalHr: "10",
      totalAmount: "700"
    },
    {
      checkIn: "10am",
      checkOut: "10pm",
      totalHr: "10",
      totalAmount: "700"
    },
    {
      checkIn: "10am",
      checkOut: "10pm",
      totalHr: "10",
      totalAmount: "700"
    },
    {
      checkIn: "10am",
      checkOut: "10pm",
      totalHr: "10",
      totalAmount: "700"
    },
    {
      checkIn: "10am",
      checkOut: "10pm",
      totalHr: "10",
      totalAmount: "700"
    },
    {
      checkIn: "10am",
      checkOut: "10pm",
      totalHr: "10",
      totalAmount: "700"
    },
    {
      checkIn: "10am",
      checkOut: "10pm",
      totalHr: "10",
      totalAmount: "700"
    },
    {
      checkIn: "10am",
      checkOut: "10pm",
      totalHr: "10",
      totalAmount: "700"
    },
    {
      checkIn: "10am",
      checkOut: "10pm",
      totalHr: "10",
      totalAmount: "700"
    },
    {
      checkIn: "10am",
      checkOut: "10pm",
      totalHr: "10",
      totalAmount: "700"
    },
    {
      checkIn: "10am",
      checkOut: "10pm",
      totalHr: "10",
      totalAmount: "700"
    },
    {
      checkIn: "10am",
      checkOut: "10pm",
      totalHr: "10",
      totalAmount: "700"
    },
    {
      checkIn: "10am",
      checkOut: "10pm",
      totalHr: "10",
      totalAmount: "700"
    }
  ]
  //For Notifications....................................
  const notificationHandler = (userToken) => {
    const temp = userNotificationFunction(userToken)
      .then((response) => {
        getNotificationArray(response.data);
        getNotificationCounts(response.data.length);
        setRefreshing(false);
      })
      .catch((error) => { console.log("errror:", error.response.data) })
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (postUserToken) {
      notificationHandler(postUserToken);
    }
  }, [])
  return (
    <View style={[
      styles.mainContainer, {
        paddingBottom: insets.bottom,
      }
    ]}>
      <Text style={[styles.todayTxt, { color: "black", alignSelf: "center", fontFamily: "MontserratAlternates-Bold", }]}> Home</Text >
      <View style={styles.headerStatusCard}>
        <Text style={[styles.todayTxt, { fontFamily: "MontserratAlternates-Bold" }]}>Today</Text>
        <View style={styles.firstSectionView}>
          <View style={styles.firstSectionTimeView}>
            <Text style={[styles.todayTxt, { color: "black", fontFamily: "MontserratAlternates-Regular", }]}>Total hours- <Text style={{ fontWeight: "400" }}>05:52:00</Text></Text>
            <Text style={[styles.todayTxt, { color: "black", fontFamily: "MontserratAlternates-Regular", }]}>Total Amount- <Text style={{ fontWeight: "400" }}>$2200</Text></Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.statusHeadingView}>
          <Text style={styles.statusHeadingTxt}>Check In</Text>
          <Text style={styles.statusHeadingTxt}>Check Out</Text>
          <Text style={styles.statusHeadingTxt}>Total Hr's</Text>
          <Text style={styles.statusHeadingTxt}>Total Amount</Text>
        </View>

        {/* <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { onRefresh() }} />} showsVerticalScrollIndicator={false} style={{ }}>
          {statusLog.map((item, index) => (
            // console.log("index", index),
            <EmplyeeCheckStausHomePage item={item} index={index} key={index} />
          )
          )}
        </ScrollView> */}
        {statusLog.length != 0 ?
          <FlatList
            data={statusLog}
            renderItem={(item, index) => {
              return (
                <EmplyeeCheckStausHomePage item={item} index={index} key={index} />
              )
            }}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: "80%" }}
          /> : <Loading />}
      </View>
    </View >
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 18,
    padding: 20
  },
  headerStatusCard: {
    alignSelf: "center",
    flexDirection: "column",
    gap: 22,
    // borderColor: "#004743",
    // borderWidth: 1,
    backgroundColor: "#DFE5EE",
    borderRadius: 10,
    width: "100%",
    padding: 15,
  },
  todayTxt: {
    fontSize: 20,
    color: "#004743",
  },
  firstSectionView: {
    // borderColor: "red",
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  firstSectionTimeView: {
    flexDirection: "column",
    gap: 20
  },
  statusHeadingView: {
    // borderWidth:1,
    // borderColor:"red",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#004743",
    width: "100%",
    paddingVertical: 9,
  },
  statusHeadingTxt: {
    fontSize: 13,
    color: "#FFFFFF",
    fontFamily: "MontserratAlternates-Regular"
  },
})
export default Home