import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import { testFirestoreConnection, getOptions } from "./../../Firebase/Firestore";
import { FlightTrackDropDownOption } from "./FlightTrackDropDownOption";

/**
 * Flight Track Drop Down
 * @param props options, onUpdate, data
 * @returns A dropdown menu with selectable elements
 */
export function FlightTrackDropDown(props) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(props.data || {id: '', name: ''});

  const handlePress = () => {
    setExpanded(prev => !prev);
  };

  const onSelect = option => {
    setSelected(option);
    props.onUpdate(option.id);
    handlePress();
  };

  const renderDropDown = () => {
    if (expanded) {
      return (
        (!!props.options ? props.options : [{name: 'Test option 1', id: '1'}, {name: 'Test option 2', id: '2'}, {name: 'Test option 3', id: '3'}, {name: 'Test option 4', id: '4'}])
          .map((option) => {
            return (
              <FlightTrackDropDownOption key={option.id} option={option} onPress={onSelect} />
            )
          })
      );
    }
    return (<></>);
  }

  return (
    <>
      <View style={styles.accordion}>
        <View style={styles.label}>
          <Text 
            style={[styles.labelText, !!props.color ? {color: props.color} : {}]}
          >
            {props.labelText || "No label prop provided"}
          </Text>
        </View>
        <Pressable style={styles.pressable} onPress={handlePress}>
          <Text>{selected.name}</Text>
          <View>
            <Image style={[styles.icon]} source={require('../../assets/DropDownArrow.png')} />
          </View>
        </Pressable>
        <ScrollView style={[styles.dropDown]}>
          {renderDropDown()}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  accordion: {
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
  pressable: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  dropDown: {
    width: '100%',

  },
  icon: {
    resizeMode: "contain",
    margin: 5,
    marginRight: 16,
    width: 25,
    height: 25,
  },
});