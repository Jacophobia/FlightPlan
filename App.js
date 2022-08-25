import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { testFirestoreConnection } from "./Firebase/Firestore";
import { Login } from "./Pages/Login";
import { RecordFlightForm } from "./Pages/RecordFlightForm";
import { ProgressBar } from "react-native-paper";
import Flight from "./DataStructures/Flight";
import { SignUp } from "./Pages/SignUp";

const Pages = {
  LOGIN: 1,
  SIGN_UP: 2,
  RECORD_FLIGHT: 3,
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

  const navigate = {
    home() {},
    login() { setPage(Pages.LOGIN); },
    signUp() { setPage(Pages.SIGN_UP); },
    recordFlightForm() { setPage(Pages.RECORD_FLIGHT); },
  };

  const initializeScreen = async () => {
    let view = (
      <Text style={styles.helloWorldText}>
        An Error Occurred. Please contact the development team.
      </Text>
    );
    if (await testFirestoreConnection() === true) {
      switch (page) {
        case Pages.LOGIN:
          view = (<Login navigate={navigate} />);
          break;
        case Pages.SIGN_UP:
          view = (<SignUp navigate={navigate} />);
          break;
        case Pages.RECORD_FLIGHT:
          view = (<RecordFlightForm navigate={navigate} />);
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
