import React, { useState } from "react";
import { Text, View, Image, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FlightTrackButton } from "./PageComponents/FlightTrackButton";
import { recoverAccount } from "./Firebase/Auth";
import { FlightTrackFancyInput } from "./PageComponents/FlightTrackFancyInput";
import { styles } from "./Login";

export function ForgotLogin({navigation, route}) {
  const { loginEmail } = route.params;
  console.log(loginEmail)

  const [email, setEmail] = useState(loginEmail || '');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      await recoverAccount(email);
      navigation.goBack();
      alert(
        `A recovery email has been sent to ${email}.\n` + 
        `If it does not show up immediately, please check for it in your spam folder.`
      );
    } catch (error) {
      alert(`Error: We have no record of this account: ${email}`);
    }
    setLoading(false);
  };

  return (
    <LinearGradient 
      colors={
        [
          '#ffffff',
          '#ffffff',
          '#4C71C7',
          // '#177cbf', // medium blue from logo
          // '#4C71C7', // dark blue from logo
        ]
      } 
      style={styles.enclosingView}
    >
      <View style={styles.pageContent} enabled={true}>  
        <View style={styles.logoContainer} >
          <Image 
            source={require("./../assets/Logo.png")} 
            style={styles.logo}
          />
        </View>
        <KeyboardAvoidingView style={styles.input} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled={Platform.OS === 'ios'}>
          <FlightTrackFancyInput label='Email Address' value={email} onUpdate={setEmail} keyboardType='email-address' />
          <FlightTrackButton style={styles.submit} label='Recover' onPress={submit} enabled={!loading} />
        </KeyboardAvoidingView>
      </View>
      <Pressable onPressIn={navigation.goBack} style={styles.signUp} >
        <Text style={styles.signUpText}>Log In</Text>
      </Pressable>
    </LinearGradient>
  );
}