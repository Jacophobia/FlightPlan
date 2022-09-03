import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import { FlightTrackDropDownOption } from "./FlightTrackDropDownOption";

const findOption = (id, options) => {
  if (!id || id === '' || id === undefined) {
    return {name: '', id: ''};
  }
  return options.find(option => option.id === id);
};

const findOptionName = (id, options) => {
  return findOption(id, options).name || '';
};

/**
 * Flight Track Drop Down
 * @param props options, onUpdate, data
 * @returns A dropdown menu with selectable elements
 */
export function FlightTrackDropDown({data, options, onUpdate, color, labelText}) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState('');

  if (selected !== data) {
    setSelected(data);
  }

  const handlePress = () => {
    setExpanded(prev => !prev);
  };

  const onSelect = option => {
    onUpdate(option.id);
    setSelected(option.id);
    handlePress();
  };

  const DropDown = () => {
    if (expanded) {
      return (
        options.map((option) => {
          return (
            <FlightTrackDropDownOption key={option.id} option={option} onPress={onSelect} />
          );
        })
      );
    }
    return (<></>);
  }

  const icon = expanded ? require('../../assets/DropDownArrow.png') : require('../../assets/OpenDropDownArrow.png');

  return (
    <>
      <View style={styles.accordion}>
        <View style={styles.label}>
          <Text 
            style={[styles.labelText, !!color ? {color: color} : {}]}
          >
            {labelText || "No label prop provided"}
          </Text>
        </View>
        <Pressable style={styles.pressable} onPress={handlePress}>
          <Text>{findOptionName(selected, options)}</Text>
          <View>
            <Image style={[styles.icon]} source={icon} />
          </View>
        </Pressable>
        <ScrollView style={[styles.dropDown]}>
          <DropDown />
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