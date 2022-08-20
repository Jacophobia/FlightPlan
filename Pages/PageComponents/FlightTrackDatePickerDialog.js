import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';

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
    <Portal>
      <Dialog style={styles.dialogContainer} visible={visible} onDismiss={hideDialog}>
        <View style={styles.dateOptions}>
          <Dialog.ScrollArea style={[styles.dateFieldContainer, styles.roundedLeft]}>
            <ScrollView style={styles.dateField} contentContainerStyle={{paddingHorizontal: 10}}>
              {range(1, 12).map(val => <View><Text>{val}</Text></View>)}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.ScrollArea style={styles.dateFieldContainer}>
            <ScrollView style={styles.dateField} contentContainerStyle={{paddingHorizontal: 10}}>
              {range(1, 31).map(val => <View><Text>{val}</Text></View>)}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.ScrollArea style={[styles.dateFieldContainer, styles.roundedRight]}>
            <ScrollView style={styles.dateField} contentContainerStyle={{paddingHorizontal: 10}}>
              {range(currentYear + 5, currentYear - 5, -1).map(val => <View key={val}><Text styles={styles.number}>{val}</Text></View>)}
            </ScrollView>
          </Dialog.ScrollArea>
        </View>
      </Dialog>
    </Portal>
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