import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";
import { FlightTrackInput } from "./PageComponents/FlightTrackInput";
import LinearGradient from 'react-native-linear-gradient';
import { Button, Menu, Divider, Provider, List } from 'react-native-paper';
import { transparent } from "react-native-paper/lib/typescript/styles/colors";
import { FlightTrackDropDownOption } from "./FlightTrackDropDownOption";

const iconWidth = 45;
const iconHeight = 45;

/**
 * Flight Track Drop Down
 * @param props data, onUpdate
 * @returns A dropdown menu with selectable elements
 */
export function FlightTrackDropDown(props) {
  const [expanded, setExpanded] = useState(true);
  const [selected, setSelected] = useState('');

  const handlePress = () => {
    setExpanded(prev => !prev);
  };

  const onSelect = value => {
    setSelected(value);
    handlePress();
  };

  const renderDropDown = () => {
    if (expanded) {
      return (
        (!!props.data ? props.data : ['Test Value 1', 'Test Value 2', 'Test Value 3', 'Test Value 4'])
          .map((value) => {
            return (
              <FlightTrackDropDownOption value={value} onPress={onSelect} />
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
            style={[styles.labelText, !!props.labelColor ? {color: props.labelColor} : {}]}
          >
            {props.labelText || "No label prop provided"}
          </Text>
        </View>
        <Pressable style={styles.pressable} onPress={handlePress}>
          <Text>{selected}</Text>
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