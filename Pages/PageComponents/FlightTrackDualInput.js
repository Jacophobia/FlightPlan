import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';

/**
 * Flight Track Dual Input
 * @param props leftField, rightField, data (right, left), labelText, onUpdate
 * @returns An input field with two configurable inputs
 */
export function FlightTrackDualInput(props) {
  
  const [data, setData] = useState({
    'right': props?.data?.right || '',
    'left': props?.data?.left || '',
  })

  const setRightData = newRightData => {
    setData(oldData => {
      oldData.right = newRightData;
      props.onUpdate(oldData);
      return oldData;
    });
  };

  const setLeftData = newLeftData => {
    setData(oldData => {
      oldData.left = newLeftData;
      props.onUpdate(oldData);
      return oldData;
    });
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
          <props.leftField onUpdate={setLeftData} data={data.left} label={props.leftLabel} color={props.color} />
          <props.rightField onUpdate={setRightData} data={data.right} label={props.rightLabel} color={props.color} />
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