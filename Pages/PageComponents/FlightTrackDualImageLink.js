import React from "react";
import { Linking, Pressable, StyleSheet, Text, View, Image } from 'react-native';


export function FlightTrackDualImageLink({label, leftLabel, rightLabel, leftUrl, rightUrl, style}) {
  const openLink = async (link, alertMessage) => {
    if (!link) {
      alert(alertMessage);
      return;
    }
    const canOpen = await Linking.canOpenURL(link);
    if (!canOpen) {
      console.error('Unable to open external link');
      return;
    }
    Linking.openURL(link)
      .then(result => console.log('OpenUrlResult:', result))
      .catch(error => console.log('OpenUrlError:', error));
  };

  const onLeftUrlPress = async () => {
    await openLink(leftUrl, `${leftLabel} ${label} not available.`);
  };
  const onRightUrlPress = async () => {
    await openLink(rightUrl, `${rightLabel} ${label} not available.`);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelContainer}>
        <Text>{label}:</Text>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.label}>
          <Text>{leftLabel}:</Text>
        </View>
        <Pressable style={styles.data} onPress={onLeftUrlPress}>
          {!!leftUrl ? <Image style={styles.icon} source={require('../../assets/Browser.png')} /> : <></>}
        </Pressable>
        <View style={styles.label}>
          <Text>{rightLabel}:</Text>
        </View>
        <Pressable style={styles.data} onPress={onRightUrlPress}>
          {!!rightUrl ? <Image style={styles.icon} source={require('../../assets/Browser.png')} /> : <></>}
        </Pressable>
      </View>
    </View>
  );
}

const outline = {
  // borderWidth: 1,
  // borderColor: 'red',
}

const styles = StyleSheet.create({
  container: {
    ...outline,
    width: '86%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginVertical: '2%',
  },
  labelContainer: {
    ...outline,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  label: {
    ...outline,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: '2%',
    height: '100%',
  },
  dataContainer: {
    ...outline,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '7%',
  },
  data: {
    ...outline,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  icon: {
    width: '30%',
    resizeMode: "contain",
  },  
});