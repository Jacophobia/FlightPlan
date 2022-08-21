import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";
import { Login } from "./Pages/Login";
import { RecordFlightForm } from "./Pages/RecordFlightForm";
import { ProgressBar } from "react-native-paper";

const Pages = {
  LOGIN: 1,
  RECORD_FLIGHT: 2,
};

const App = () => {
  const [page, setPage] = useState(Pages.RECORD_FLIGHT);
  const [screen, setScreen] = useState(
    <View style={styles.loading}>
      <ProgressBar
        progress={0.5} color="#177cbf"
      />
    </View>
  );

  const initializeScreen = async () => {
    let view = (
      <Text style={styles.helloWorldText}>
        An Error Occurred. Please contact the development team.
      </Text>
    );
    if (await testFirestoreConnection() === true) {
      switch (page) {
        case Pages.LOGIN:
          view = (
            <Login />
          );
          break;
        case Pages.RECORD_FLIGHT:
          view = (
            <RecordFlightForm />
          );
          break;
        default:
          view = (
            <Text>
              The page you requested must be added to App.js
            </Text>
          );
      }
    }
    else {
      view = (
        <Text style={styles.helloWorldText}>
          Unable to connect to database.. Very sad.
        </Text>
      );
    }
    setScreen(<>{view}</>);
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
