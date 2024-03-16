import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const EmplyeeCheckStausHomePage = (item, index) => {
  const [employeeData, seTemployeeData] = useState();
  useEffect(() => {
    seTemployeeData(item.item.item);
  }, [item]);

  return (
    <>{
      employeeData ?
        (<View style={styles.container}>
          <View style={styles.statusHeadingView}>
            <Text style={styles.statusHeadingTxt}>{employeeData.checkIn}</Text>
            <Text style={styles.statusHeadingTxt}>{employeeData.checkOut}</Text>
            <Text style={styles.statusHeadingTxt}>{employeeData.totalHr}</Text>
            <Text style={styles.statusHeadingTxt}>{employeeData.totalAmount}</Text>
          </View>
        </View>
        ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 3,
    // borderWidth:1
  },
  statusHeadingView: {
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#DFE5EE",
    width: "100%",
    paddingVertical: 9,
  },
  statusHeadingTxt: {
    fontSize: 15,
    color: "#000000",
    // borderWidth:1,
    // borderColor:"red",
    fontFamily: "MontserratAlternates-Regular",
    width: "20%",
    textAlign: "center"
  }
})
export default EmplyeeCheckStausHomePage
