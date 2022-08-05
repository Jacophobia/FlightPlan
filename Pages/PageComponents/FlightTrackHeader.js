import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

/**
 * Flight Track Header
 * @param props headerText, onBackArrowPress
 * @returns A custom header with a back button, logo, and label for the current page
 */
export function FlightTrackHeader(props) {

  const getHeaderText = () => {
    if (!props.headerText) {
      return (
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>
            No Header
          </Text>
        </View>
      );
    }

    let style = styles.headerText;
    let containerStyle = styles.headerTextContainer;
    if (props.headerText.length > 12) {
      style = styles.smallHeaderText;
      containerStyle = styles.smallHeaderTextContainer;
    }

    return (
      <View style={containerStyle}>
        <Text style={style}>{props.headerText}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.iconContainer} onPress={props.onBackArrowPress}>
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 13,
    paddingTop: 12,
    width: '100%',
  },
  headerContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 7,
  },
  iconContainer: {
    marginHorizontal: 9,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    resizeMode: "contain",
    width: 45,
  },
  logo: {
    resizeMode: "contain",
    width: 70,
  },
  separator: {
    width: '97%',
    height: 7,
    backgroundColor: '#177dbf',
    borderRadius: 3,
    marginVertical: 2,
  },
  headerText: {
    fontSize: 40,
    width: '100%',
    height: '112%',
    color: '#222e60',
  },
  headerTextContainer: {
  },
  smallHeaderText: {
    fontSize: 33,
    width: '100%',
    height: '112%',
    color: '#222e60',
  },
  smallHeaderTextContainer: {
    marginTop: 6,
  },
});