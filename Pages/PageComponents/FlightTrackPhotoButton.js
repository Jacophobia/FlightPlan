import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";
import { FlightTrackInput } from "./PageComponents/FlightTrackInput";
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera } from "react-native-image-picker";

export function FlightTrackPhotoButton(props) {
  const [opacity, setOpacity] = useState(1.0);

  const openCamera = async () => {
    const newPhoto = await launchCamera({includeBase64: true, mediaType: 'photo', quality: 0.5})
    if (!newPhoto || !newPhoto.assets || !newPhoto.assets[0] || !newPhoto.assets[0].base64) {
      alert("Error: Unable to take photo");
      return;
    }
    props.onUpdate(newPhoto.assets[0]['base64']);
    setOpacity(0.5);
  };

  return (
    <Pressable style={styles.container} onPress={async () => { await openCamera(); }}>
      <Text>{props.label || ''}</Text>
      <Image style={[styles.icon, {opacity: opacity}]} source={require('../../assets/Camera.png')}></Image>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    width: '40%',
  },
  icon: {
    resizeMode: "contain",
    height: 36,
    width: '40%',
    marginLeft: 10,
    marginRight: 20,
    margin: 10,
  },
});