import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";
import { Login } from "./Pages/Login";
import { RecordFlightForm } from "./Pages/RecordFlightForm";

const Page = {
  LOGIN: 1,
  RECORD_FLIGHT: 2,
};

const App = () => {
  const [page, setPage] = useState(Page.LOGIN);
  const [screen, setScreen] = useState(
    <View style={styles.loading}>
      <Text style={styles.helloWorldText}>
        loading...
      </Text>
    </View>
  );

  const initializeScreen = async () => {
    let view = (
      <Text style={styles.helloWorldText}>
        An Error Occurred. Please tell Jacob to fix the code.
      </Text>
    );
    if (await testFirestoreConnection() === true) {
      switch (page) {
        case Page.LOGIN:
          view = (
            <Login />
          );
          break;
        case Page.RECORD_FLIGHT:
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
