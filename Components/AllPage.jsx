import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StackScreens from '../Navigation/StackScreens/StackScreens'

const AllPage = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <StatusBar
          animated={true}
          backgroundColor="#0C261B" />
        <StackScreens />
      </View>
  )
}

export default AllPage

const styles = StyleSheet.create({})