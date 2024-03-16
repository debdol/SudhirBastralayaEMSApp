import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import OTPInputView from '@twotalltotems/react-native-otp-input'

import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Feather from 'react-native-vector-icons/dist/Feather'
import { userVarifyOtpFunction } from '../../Functions/Functions'

const SendOtp = ({ navigation, route }) => {
    const [otp, setOtp] = useState();

    const getOtpHandler = () => {
        if (otp) {
            let data = {
                email: route.params.email,
                otp: Number(otp)
            }
            let temp = userVarifyOtpFunction(data)
            .then((response) => {
                navigation.navigate("SetPassword", { varifiedToken: response.data.token, email: route.params.email });
            })
            .catch((error) => console.log("response_varify_otp:", error))
        }
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headingView}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' size={30} color={"rgba(0, 71, 67, 0.7)"} />
                </TouchableOpacity>
                <Text style={[styles.txt, { color: "black", fontFamily: "MontserratAlternates-Bold" }]}> Varify OTP</Text>
                <Text style={{ width: "10%" }}></Text>
            </View>
            <Image source={require("../../assets/Images/logo.png")} style={styles.logoImg} />
            <Text style={[styles.txt, { color: "black", alignSelf: "center", fontFamily: "Amita-Bold", fontSize: 26 }]}>Sudhir Bastralaya</Text>
            <OTPInputView
                style={{ width: '80%', height: 100, alignSelf: "center", width: "100%" }}
                pinCount={6}
                editable
                code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={code => {
                    setOtp(code);
                    // console.log("otp:", code)
                }}
                placeholderTextColor='rgba(0, 71, 67, 0.7)'
                autoFocusOnLoad
                secureTextEntry
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code => {
                    // console.log(`Code is ${code}, you are good to go!`)
                    setOtp(code);
                })}
            />
            <TouchableOpacity style={styles.signInBtn} onPress={() => { getOtpHandler() }}>
                <Text style={styles.signInBtnTxt}>Set password</Text>
                <Feather name='arrow-right' size={20} style={styles.signInBtnIcon} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // borderColor:"red",
        // borderWidth:1,
        flexDirection: "column",
        gap: 9,
        padding: 20
    },
    headingView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },

    txt: {
        fontSize: 20,
        color: "#05ACFA"
    },
    logoImg: {
        alignSelf: "center",
        height: 110,
        width: 90,
        // borderColor:"red",
        // borderWidth:1,
    },
    icon: {
        color: "black"
    },
    signInBtn: {
        // borderColor:"red",
        // borderWidth:1,
        flexDirection: "row",
        gap: 9,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 35,
        height: 50,
        width: "100%",
        alignSelf: "center",
        backgroundColor: "rgba(0, 71, 67, 0.7)",
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        position: "absolute",
        bottom: 6,
    },
    signInBtnTxt: {
        color: "white",
        fontFamily: "MontserratAlternates-Bold"
    },
    signInBtnIcon: {
        color: "white"
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 50,
        height: 50,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: "black",
        fontSize: 20,
        // borderColor: "red",
        // borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#DFE5EE",
    },

    underlineStyleHighLighted: {
        borderColor: "rgba(0, 71, 67, 0.7)",
    },
})
export default SendOtp