import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";
import { FlightTrackInput } from "./PageComponents/FlightTrackInput";
import LinearGradient from 'react-native-linear-gradient';
import { Button, Menu, Divider, Provider } from 'react-native-paper';

export function FlightTrackDropDown(props) {
  const [visible, setVisible] = React.useState(true);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <ScrollView style={{width: '100%', borderWidth: 1, borderColor: 'red', }}>
      <View
        style={{
          paddingTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}>
        <Menu
          style={{width: '100%', borderWidth: 1, borderColor: 'red',}}
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Pressable style={{ width: '100%'}} onPress={openMenu}><Text>Show menu</Text></Pressable>}>
          <Menu.Item onPress={() => {setVisible(false)}} title="Item 1" />
          <Divider />
          <Menu.Item onPress={() => {setVisible(false)}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {setVisible(false)}} title="Item 3" />
        </Menu>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

});