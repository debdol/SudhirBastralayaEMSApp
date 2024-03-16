import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'

const MyAttendance = ({ navigation, route }) => {
  const [data, setData] = useState();

  useEffect(() => {
    setData(route.params.data)
  }, [route.params.data]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='arrowleft' size={30} color={"rgba(0, 71, 67, 0.7)"}/>
        </TouchableOpacity>
        <Text style={[styles.todayTxt, { color: "black" ,fontFamily:"MontserratAlternates-Bold"}]}>My Attendance</Text>
        <Text style={{width:"10%"}}></Text>
      </View>
      <View>
        <Text style={[styles.todayTxt, { color: "black", fontSize: 15, alignSelf: "center" ,fontFamily:"MontserratAlternates-Regular",fontWeight:"800"}]}>{data}</Text>
      </View>
      <View style={styles.statusHeadingView}>
        <Text style={styles.statusHeadingTxt}>Check In</Text>
        <Text style={styles.statusHeadingTxt}>Check Out</Text>
        <Text style={styles.statusHeadingTxt}>Total Hr's</Text>
        <Text style={styles.statusHeadingTxt}>Total Amount</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    gap: 9,
    padding: 20
  },
  headingView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width:"100%"
  },
  todayTxt: {
    fontSize: 20,
    // fontFamily:"Forza-Bold",
    color: "#05ACFA"
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
    fontFamily:"MontserratAlternates-Regular",
    color: "#FFFFFF",
  },
})
export default MyAttendance