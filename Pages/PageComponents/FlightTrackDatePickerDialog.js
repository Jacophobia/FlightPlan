import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

const range = (start, stop, step = 1) => {
  let val = [];
  for (let i = start; start < stop ? i <= stop: i >= stop; i += step) {
    val.push(i);
  }
  return val;
};

export default function FlightTrackDatePickerDialog(props) {
  const [visible, setVisible] = useState(props.visible || true)

  const hideDialog = () => setVisible(false);

  const currentYear = new Date().getFullYear();

  return (
      <DatePicker
        modal
        open={true}
        date={new Date()}
        onConfirm={date => {
          console.log("Date = ", date.toLocaleDateString())
        }}
        onCancel={() => console.log("Cancelled!")}
      />
  );
};

const styles = StyleSheet.create({
  dateOptions: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  dialogContainer: {
    borderRadius: 10,
    height: '10%',
  },
  dateField: {
  },
  dateFieldContainer: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    height: '100%',
  },
  roundedLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  roundedRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  number: {
    fontSize: 450,
  },
});