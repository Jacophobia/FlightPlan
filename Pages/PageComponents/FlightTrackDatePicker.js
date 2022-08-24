import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Image, TextInput, ScrollView } from 'react-native';
import DatePicker from "react-native-date-picker";


export function FlightTrackDatePicker(props) {
  const [date, setDate] = useState(props.data || new Date());
  const [open, setOpen] = useState(false);
  
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
        <Pressable style={styles.pressable} onPress={() => setOpen(true)}>
          <Text>{date.toDateString()}</Text>
          <View>
            <Image style={[styles.icon]} source={require('../../assets/Calendar.png')} />
          </View>
        </Pressable>
        <DatePicker
          mode="date"
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setDate(date);
            props.onUpdate(date);
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
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
    marginRight: 8,
    width: 40,
    height: 40,
  },
});