import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';

/**
 * Flight Track Dual Input
 * @param props leftField, rightField, data (right, left), labelText, onUpdate, getLeft, getRight
 * @returns An input field with two configurable inputs
 */
export function FlightTrackDualInput(props) {
  const setRightData = newRightData => {
    const left = props.getLeft(props.data);
    props.onUpdate({left: left, right: newRightData});
  };

  const setLeftData = newLeftData => {
    const right = props.getRight(props.data);
    props.onUpdate({left: newLeftData, right: right});
  };

  return (
    <>
      <View style={styles.InputField}>
        <View style={styles.label}>
          <Text 
            style={[styles.labelText, !!props.color ? {color: props.color} : {}]}
          >
            {props.labelText || "No label prop provided"}
          </Text>
        </View>
        <View style={styles.inputArea}>
          <props.leftField onUpdate={setLeftData} data={props.getLeft(props.data)} label={props.leftLabel} color={props.color} />
          <props.rightField onUpdate={setRightData} data={props.getRight(props.data)} label={props.rightLabel} color={props.color} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  InputField: {
    width: '90%',
    marginTop: 15,
    borderWidth: 2.5,
    borderColor: '#b0b0b0',
    borderRadius: 12,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: 'transparent',
  },
  label: {
    position: 'absolute',
    left: 16,
    top: -13,
    backgroundColor: 'white',
    paddingHorizontal: 2,
  },
  labelText: {
    fontSize: 17,
    color: '#b0b0b0',
  },
  inputArea: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingLeft: 10,
  },
  dropDown: {
    width: '100%',

  },
  icon: {
    resizeMode: "contain",
    margin: 5,
    marginRight: 8,
    width: 40,
    height: 40,
  },
});