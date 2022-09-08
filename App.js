import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { testFirestoreConnection } from "./Pages/Firebase/Firestore";
import { Login } from "./Pages/Login";
import { RecordFlightForm } from "./Pages/RecordFlightForm";
import { ProgressBar } from "react-native-paper";
import { SignUp } from "./Pages/SignUp";
import { Home } from "./Pages/Home";
import { Flights } from "./Pages/Flights";
import { CrewMembers } from "./Pages/CrewMembers";
import { Planes } from "./Pages/Planes";
import { Clients } from "./Pages/Clients";
import { Principles } from "./Pages/Principles";
import { Purposes } from "./Pages/Purposes";
import { Profile } from "./Pages/Profile";
import { Flight } from "./Pages/Flight";
import { ForgotLogin } from "./Pages/ForgotLogin";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [screen, setScreen] = useState(
    <View style={styles.loading}>
      <ProgressBar
        progress={0.5} color="#177cbf"
      />
    </View>
  );

  const initializeScreen = async () => {
    let view = (
      <View style={styles.loading}>
        <Text style={styles.helloWorldText}>
          Unable to connect to database.
        </Text>
        <Text style={styles.helloWorldText}>
          Try again when you have a better connection.
        </Text>
      </View>
    );
    if (await testFirestoreConnection() === true) {
      view = (
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
          <Stack.Screen name='SignUp' component={SignUp} options={{headerShown: false}} />
          <Stack.Screen name='ForgotLogin' component={ForgotLogin} options={{headerShown: false}} />
          <Stack.Screen name='Home' component={Home} options={{headerShown: false}} />
          <Stack.Screen name='RecordFlightForm' component={RecordFlightForm} options={{headerShown: false}} />
          <Stack.Screen name='Flights' component={Flights} options={{headerShown: false}} />
          <Stack.Screen name='Flight' component={Flight} options={{headerShown: false}} />
          <Stack.Screen name='CrewMembers' component={CrewMembers} options={{headerShown: false}} />
          <Stack.Screen name='Planes' component={Planes} options={{headerShown: false}} />
          <Stack.Screen name='Clients' component={Clients} options={{headerShown: false}} />
          <Stack.Screen name='Principles' component={Principles} options={{headerShown: false}} />
          <Stack.Screen name='Purposes' component={Purposes} options={{headerShown: false}} />
          <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}} />
        </Stack.Navigator>
      );
    }
    setScreen(view);
  };
  
  initializeScreen();

  return (
    <>{screen}</>
  );
};

export default App;

const styles = new StyleSheet.create({
  helloWorldText: {
    color: '#CB7334',
  },
  loading: {
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
    height: '100%'
  }
});
