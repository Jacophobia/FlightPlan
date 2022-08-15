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
      <Dialog visible={visible} onDismiss={hideDialog}>
        <View style={styles.dialogContainer}>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{paddingHorizontal: 10}}>
              {range(1, 12).map(val => <View><Text>{val}</Text></View>)}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{paddingHorizontal: 10}}>
              {range(1, 31).map(val => <View><Text>{val}</Text></View>)}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{paddingHorizontal: 10}}>
              {range(currentYear, currentYear - 10, -1).map(val => <View><Text>{val}</Text></View>)}
            </ScrollView>
          </Dialog.ScrollArea>
        </View>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
});