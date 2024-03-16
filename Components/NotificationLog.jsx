import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'

const NotificationLog = ({ item, index }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.box}>
                <View style={styles.dayDateView}>
                    <Text style={[styles.Txt, { fontFamily: "MontserratAlternates-Bold" }]}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
                    <Text style={styles.Txt}>{item.dateTime.split("T")[0]}</Text>
                </View>
                <Text style={styles.Txt}>{item.message.charAt(0).toUpperCase() + item.message.slice(1)}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        // flexDirection: "column",
        gap: 9,
        padding: 5,
    },
    box: {
        backgroundColor: "#FFFFFF",
        borderColor: "#E0EAEF",
        borderWidth: 1,
        borderRadius: 9,
        padding: 9,
        elevation: 5,
        shadowColor: '#05ACFA',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    dayDateView: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    Txt: {
        fontSize: 15,
        fontFamily: "MontserratAlternates-Regular",
        color: "black"
    },
})
export default NotificationLog