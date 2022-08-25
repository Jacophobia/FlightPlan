import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";
import { onStateChange } from "./Firebase/Auth";
import { Login } from "./Pages/Login";
import { RecordFlightForm } from "./Pages/RecordFlightForm";
import { ProgressBar } from "react-native-paper";
import Flight from "./DataStructures/Flight";
import { SignUp } from "./Pages/SignUp";
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
          <Stack.Screen name='RecordFlightForm' component={RecordFlightForm} options={{headerShown: false}} />
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
