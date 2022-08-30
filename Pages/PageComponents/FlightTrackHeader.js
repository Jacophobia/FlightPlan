import React from "react";
import { StyleSheet, Text, View, Image, Pressable, Platform } from 'react-native';

/**
 * Flight Track Header
 * @param props headerText, onBackArrowPress
 * @returns A custom header with a back button, logo, and label for the current page
 */
export function FlightTrackHeader({headerText, onBackArrowPress}) {

  const getHeaderText = () => {
    if (!headerText) {
      return (
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>
            No Header
          </Text>
        </View>
      );
    }

    let fontSize = 40;
    if (headerText.length >= 12) {
      fontSize = 33;
    }

    return (
      <View style={styles.headerTextContainer}>
        <Text style={[styles.headerText, {fontSize: fontSize}]}>{headerText}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.iconContainer} onPress={onBackArrowPress}>
          <Image style={styles.backArrow} source={require("../../assets/BackArrow.png")} />
        </Pressable>
        {getHeaderText()}
        <View style={styles.iconContainer}>
          <Image style={styles.logo} source={require("../../assets/Logo.png")} />
        </View>
      </View>
      <View style={styles.separator}/>
    </View>
  );
}

const outline = {
  // borderColor: 'red',
  // borderWidth: 1,
};

const styles = StyleSheet.create({
  container: {
    ...outline,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 33 : 13,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    ...outline,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    ...outline,
    marginHorizontal: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    ...outline,
    resizeMode: "contain",
    width: 45,
  },
  logo: {
    ...outline,
    resizeMode: "contain",
    width: 70,
    height: 70,
  },
  separator: {
    ...outline,
    width: '97%',
    height: 7,
    backgroundColor: '#4C71C7',
    borderRadius: 3,
  },
  headerText: {
    ...outline,
    fontSize: 40,
    width: '100%',
    color: '#222e60',
  },
  headerTextContainer: {
    ...outline,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallHeaderText: {
    ...outline,
    fontSize: 33,
    width: '100%',
    color: '#222e60',
  },
});