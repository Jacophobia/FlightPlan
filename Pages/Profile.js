import React from "react";
import { StyleSheet, View, Image } from 'react-native';
import { FlightTrackHeader } from './PageComponents/FlightTrackHeader';
import { FlightTrackDisplay } from './PageComponents/FlightTrackDisplay';
import { FlightTrackButton } from './PageComponents/FlightTrackButton';
import { logout } from './Firebase/Auth';


export function Profile({ route, navigation }) {
  const { name, email } = route.params;
  const goBack = () => {
    navigation.goBack();
  };
  const toLogin = async () => {
    await logout();
    navigation.popToTop();
  }

  return (
    <View style={styles.container}>
      <FlightTrackHeader headerText='Profile' onBackArrowPress={goBack} style={styles.header} />
      <Image source={require('../assets/ProfileCircle.png')} style={styles.profileIcon} />
      <View style={styles.divider} />
      <View style={styles.profile}>
        <View style={styles.displays}>
          <FlightTrackDisplay style={styles.display} label='Name' data={name} />
          <FlightTrackDisplay style={styles.display} label='Email' data={email} />
        </View>
        <View style={styles.buttonContainer}>
          <FlightTrackButton label='Log Out'  onPress={toLogin} />
        </View>
      </View>
    </View>
  );
}

const outline = {
  // borderColor: 'red',
  // borderWidth: 1,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    ...outline,
  },
  profileIcon: {
    ...outline,
    height: '21%',
    marginVertical: '8%',
    resizeMode: "contain",
  },
  divider: {
    height: 1,
    width: '80%',
    backgroundColor: '#000000',
  },
  profile: {
    ...outline,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  displays: {
    ...outline,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  display: {
    ...outline,
    width: '80%',
  },
  buttonContainer: {
    ...outline,
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});