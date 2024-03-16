import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CalendarStrip from 'react-native-calendar-strip';
import { GlobalData } from '../App';

const Account = ({ navigation }) => {
  const { getPageName } = useContext(GlobalData);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPageName("account");
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <Text style={[styles.todayTxt, { color: "black", alignSelf: "center", fontFamily: "MontserratAlternates-Bold" }]}>Wallet</Text>
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
          selectedDate={new Date()}
          onDateSelected={(e) => {
            let temp = JSON.stringify(e);
            // console.log("date:", temp);
            // setDate()
          }}
        />
        <View style={styles.statusCard}>
          <View style={styles.statusCardImgView}>
            <Image source={require("../assets/Images/walletImage.png")} />
          </View>
          <Text style={styles.monthTxt}>November</Text>
          <Text style={styles.monthTxt}>1st November- 30th November</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.normalTxt}>Total Work</Text>
            <Text style={styles.normalTxt}>210 Hours</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.normalTxt}>Total Ammount</Text>
            <Text style={styles.normalTxt}>Rs.21000</Text>
          </View>
          <View style={styles.status}>
            <Text style={styles.normalTxt}>Due</Text>
          </View>
        </View>
        <View style={styles.statusCard}>
          <View style={[styles.statusCardImgView, { backgroundColor: "rgb(63,182,142)" }]}>
            <Image source={require("../assets/Images/walletImage.png")} />
          </View>
          <Text style={styles.monthTxt}>December</Text>
          <Text style={styles.monthTxt}>1st December- 30th December</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.normalTxt}>Total Advance</Text>
            <Text style={styles.normalTxt}>210 Hours</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.normalTxt}>Paid this Month</Text>
            <Text style={styles.normalTxt}>Rs.21000</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.normalTxt}>Total Dues</Text>
            <Text style={styles.normalTxt}>Rs.21000</Text>
          </View>
          <View style={[styles.status, { backgroundColor: "rgb(63,182,142)" }]}>
            <Text style={styles.normalTxt}>Paid</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    gap: 9,
    padding: 20
  },
  todayTxt: {
    fontSize: 20,
    color: "#05ACFA"
  },
  statusCard: {
    backgroundColor: "#DFE5EE",
    // borderColor: "#E0EAEF",
    // borderWidth: 2,
    borderRadius: 9,
    flexDirection: "column",
    gap: 9,
    padding: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
  },
  statusCardImgView: {
    alignSelf: "center",
    backgroundColor: "#F6D172",
    height: 70,
    width: 70,
    borderRadius: 36,
    alignItems: "center",
    padding: 9
  },
  monthTxt: {
    alignSelf: "center",
    fontFamily: "MontserratAlternates-Regular",
    color: "#000000",
  },
  status: {
    alignSelf: "center",
    padding: 9,
    backgroundColor: "#F6D172",
    width: "100%",
    borderRadius: 10,
    alignItems: "center"
  },
  normalTxt: {
    color: "#000000",
    // fontWeight:"600",
    fontFamily: "MontserratAlternates-Regular"
  }
})
export default Account