import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import CalendarStrip from 'react-native-calendar-strip';
import { GlobalData } from '../App';

const History = ({ navigation }) => {
  const { getPageName } = useContext(GlobalData);
  const [dateBtnClick, setDateBtnClick] = useState(false);
  const [date, setDate] = useState(new Date());
  const [userworkStatus, setUserworkStatus] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPageName("history");
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);


  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingView}>
        <Text style={{ width: "5%" }}></Text>
        <Text style={[styles.headingTxt, { fontFamily: "MontserratAlternates-Bold" }]}>History</Text>
        <TouchableOpacity onPress={() => setDateBtnClick(!dateBtnClick)}>
          <Image source={require("../assets/Images/calendar.png")} style={styles.clenderStyle} />
        </TouchableOpacity>
        {dateBtnClick ?
          <View style={{ position: "absolute", zIndex: 2, right: 50, top: 20 }}>
            <Calendar
              onDayPress={day => {
                setDate(day.dateString);
                setDateBtnClick(false);
              }}
            />
          </View>
          : null}
      </View>
      <CalendarStrip
        scrollable
        style={{ height: 100 }}
        calendarHeaderStyle={{ color: 'black', fontSize: 19, fontWeight: "700" }}
        dateNumberStyle={{ color: 'black' }}
        dateNameStyle={{ color: 'black', fontFamily: "MontserratAlternates-Regular", fontSize: 12 }}
        iconRight={require("../assets/Images/right-arrow.png")}
        iconLeft={require("../assets/Images/arrow.png")}
        iconContainer={{ flex: 0.1 }}
        highlightDateContainerStyle={{
          backgroundColor: "#004743"
        }}
        highlightDateNameStyle={{
          color: "white"
        }}
        highlightDateNumberStyle={{
          color: "white"
        }}
        selectedDate={date}
        onDateSelected={(e) => {
          let temp = JSON.stringify(e);
          // console.log("date:", temp);
          // setDate()
        }}
      />
      <View>
        <View style={styles.statusHeadingView}>
          <Text style={styles.statusHeadingTxt}>Date</Text>
          <Text style={styles.statusHeadingTxt}>Total Hr's</Text>
          <Text style={styles.statusHeadingTxt}>Total Amount</Text>
        </View>
        <TouchableOpacity onPress={() => {
          if (userworkStatus.length != 0) {
            navigation.navigate("MyAttendance", { data: userworkStatus });
            console.log("date:", userworkStatus);
          } else {
            Alert.alert("There is no status");
          }
        }}>
          <Text style={{ fontSize: 20 }}>data</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    gap: 7,
    padding: 20
  },
  headingView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingTxt: {
    fontSize: 20,
    color: "black",
  },
  clenderStyle: {
    height: 20,
    width: 20
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
    fontSize: 15,
    fontFamily: "MontserratAlternates-Regular",
    color: "#FFFFFF",
  },
})
export default History