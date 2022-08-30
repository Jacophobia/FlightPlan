import React, { useState } from "react";
import { StyleSheet, Text, Image, Pressable } from 'react-native';
import { launchCamera } from "react-native-image-picker";

export function FlightTrackPhotoButton(props) {
  const [opacity, setOpacity] = useState(1.0);

  const openCamera = async () => {
    const newPhoto = await launchCamera({includeBase64: false, mediaType: 'photo', quality: 0.5});
    if (!newPhoto || !newPhoto.assets || !newPhoto.assets[0]) {
      alert("Error: Unable to take photo");
      return;
    }
    props.onUpdate(newPhoto.assets[0]);
    setOpacity(0.5);
  };

  return (
    <Pressable style={styles.container} onPress={async () => { await openCamera(); }}>
      <Text style={{color: props.color}}>{props.label || ''}</Text>
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