import firestore from "@react-native-firebase/firestore";
// https://www.youtube.com/watch?v=eET0YtDBWWg

export const getTestData = async () => {
  const result = await firestore()
    .collection("Test")
    .doc("123")
    .collection("SubCollection")
    .doc("SubDocument")
    .get()
    .catch(error => console.error(error));
  return result._data["SubField"];
};

export const getPlaneData = async tailNumber => {
  const result = await firestore()
    .collection("Planes")
    .doc(String(tailNumber))
    .get()
    .catch(error => console.error(error));
  return result._data;
};

export const getFlightData = async (tailNumber, flightId = -1) => {
  const flightsCollRef = firestore()
    .collection("Planes")
    .doc(String(tailNumber))
    .collection("Flights")
  if (flightId === -1) {
    let result = flightsCollRef
      .get()
      .catch(error => console.error(error));
    return result._data;
  }
  let result = flightsCollRef
    .doc(String(flightId))
    .get()
    .catch(error => console.error(error));
  return result._data;
}