import React from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';


export function FlightTrackDualDisplay({label, leftLabel, rightLabel, leftData, rightData, style}) {

  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelContainer}>
        <Text>{label}:</Text>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.display}>
          <View style={styles.leftLabelContainer}>
            <Text>{leftLabel}:</Text>
          </View>
          <View style={styles.leftDataContainer}>
            <Text>{leftData}</Text>
          </View>
        </View>
        <View style={styles.display}>
          <View style={styles.rightLabelContainer}>
            <Text>{rightLabel}:</Text>
          </View>
          <View style={styles.rightDataContainer}>
            <Text>{rightData}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const outline = {
  // borderWidth: 1,
  // borderColor: 'red',
}

const styles = StyleSheet.create({
  container: {
    ...outline,
    width: '86%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  labelContainer: {
    ...outline,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  leftLabelContainer: {
    ...outline,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rightLabelContainer: {
    ...outline,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dataContainer: {
    ...outline,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '7%',
  },
  leftDataContainer: {
    ...outline,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#D0EFFB',
    flex: 1,
    marginHorizontal: '5%',
    paddingRight: 8,

  },
  rightDataContainer: {
    ...outline,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#D0EFFB',
    flex: 1,
    marginLeft: '5%',
    paddingRight: 8,

  },
  display: {
    flexDirection: 'row',
    flex: 1,
  },
});