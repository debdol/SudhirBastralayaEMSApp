import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Fontisto from 'react-native-vector-icons/dist/Fontisto'
import Feather from 'react-native-vector-icons/dist/Feather'
import { Formik } from 'formik'
import { ScemaForForgotPassword } from '../../Scema.js/Scema'
import { userOtpFunction } from '../../Functions/Functions'

const ForgotPassWord = ({ navigation }) => {

  const otpHandler = (values) => {
    let temp = userOtpFunction(values)
      .then((response) => {
        // console.log("response_forgot_password:", response.data);
        navigation.navigate("SendOtp", { email: values.email });
      })
      .catch((error) => console.log("error_forgot_password:", error))
  }
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={ScemaForForgotPassword}
      onSubmit={(values) => { otpHandler(values) }}
    >
      {({ handleChange, handleSubmit, handleBlur, errors, touched, values }) =>
      (<View style={styles.mainContainer}>
        <View style={styles.headingView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name='arrowleft' size={30} color={"rgba(0, 71, 67, 0.7)"} />
          </TouchableOpacity>
          <Text style={[styles.txt, { color: "black", fontFamily: "MontserratAlternates-Bold" }]}>Forgot Password</Text>
          <Text style={{ width: "10%" }}></Text>
        </View>
        <Image source={require("../../assets/Images/logo.png")} style={styles.logoImg} />
        <Text style={[styles.txt, { color: "black", alignSelf: "center", fontFamily: "Amita-Bold", fontSize: 26 }]}>Sudhir Bastralaya</Text>
        <Text style={[styles.txt, { color: "black", alignSelf: "center", fontFamily: "MontserratAlternates-Regular", fontSize: 15 }]}>You will receive a 6 digit code to verify next</Text>
        <View style={styles.lebelAndInputView}>
          <Text style={[styles.txt, { color: "black", fontFamily: "MontserratAlternates-Bold", fontSize: 16 }]}>Email</Text>
          <View style={styles.iconAndInputView}>
            <Fontisto name='email' style={styles.icon} size={17} />
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              style={styles.inputStyle}
              placeholderTextColor={"rgb(100,100,100)"}
              placeholder='write your email'
              autoFocus
            />
          </View>
          {errors.email && touched.email ? (<Text style={{ color: "red", marginBottom: 9, fontFamily: "MontserratAlternates-Regular" }}>{errors.email}</Text>) : null}
        </View>
        <TouchableOpacity style={styles.signInBtn} onPress={() => { handleSubmit() }}>
          <Text style={styles.signInBtnTxt}>Send OTP</Text>
          <Feather name='arrow-right' size={20} style={styles.signInBtnIcon} />
        </TouchableOpacity>
      </View>)}
    </Formik>
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

  lebelAndInputView: {
    // borderColor:"red",
    // borderWidth:1,
    marginTop: 19,
    flexDirection: "column",
    gap: 6
  },
  iconAndInputView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DFE5EE",
    borderRadius: 9,
    padding: 9,
    // borderColor:"red",
    // borderWidth:1,
  },
  inputStyle: {
    color: "black"
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
  }
})
export default ForgotPassWord