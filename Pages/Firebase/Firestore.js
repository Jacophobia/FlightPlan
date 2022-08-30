import firestore from "@react-native-firebase/firestore";
import Flight from "./DataStructures/Flight";
// https://www.youtube.com/watch?v=eET0YtDBWWg

// v v v v v Tests v v v v v

const getTestData = async () => {
  const result = await firestore()
    .collection("Collection")
    .doc("Document")
    .collection("SubCollection")
    .doc("SubDocument")
    .get()
    .catch(error => console.error(error));
  return result.data()["SubField"];
};

export const testFirestoreConnection = async () => {
  if (await getTestData() === "Connected") {
    return true;  // tests passed
  }
  else {
    return false; // tests failed
  }
};

// ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^

const getPlanesRef = () => {
  const result = firestore()
    .collection("Planes");
  return result;
};

const getPlaneRef = (tailNumber) => {
  const result = getPlanesRef()
    .doc(String(tailNumber));
  return result;
};

const getFlightsRef = (tailNumber) => {
  const result = getPlaneRef(tailNumber)
    .collection("Flights");
  return result;
};

const getFlightRef = (tailNumber, flightId) => {
  const result = getFlightsRef(tailNumber)
    .doc(String(flightId));
  return result;
};

const getCrewMembersRef = () => {
  const result = firestore()
    .collection("Crew Members");
  return result;
};

const getCrewMemberRef = (id) => {
  const result = getCrewMembersRef()
    .doc(String(id));
  return result;
};

const getClientsRef = () => {
  const result = firestore()
    .collection("Clients");
  return result;
};

const getClientRef = (id) => {
  const result = getClientsRef()
    .doc(String(id));
  return result;
};

const getPrinciplesRef = () => {
  const result = firestore()
    .collection("Principles");
  return result;
};

const getPrincipleRef = (id) => {
  const result = getPrinciplesRef()
    .doc(String(id));
  return result;
};

const getProfilesRef = () => {
  const result = firestore()
    .collection("Profiles");
  return result;
};

export const addCrewMember = async (user, name, callback = () => {}) => {
  try {
    await getCrewMembersRef().doc(user.uid).set({
      name,
      email: user.email,
      uid: user.uid,
    });
    callback();
  }
  catch (error) {
    alert('Unable to add to crew members list. Please contact an administrator to be added manually.');
    console.error(error);
  }
};

export const getFlight = async (tailNumber, flightId) => {
  try {
    
    alert('Get flight not yet implemented');
    callback();
  } catch (error) {
    console.error(error);
  }
};

/**
 * Add Flight
 * @param {Flight} flight 
 * @param {FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>} flightsRef
 * @returns undefined if unsuccessful, or a reference to the newly added value
 */
export const addFlight = async (flight, flightsRef = undefined) => {
  let customRef = true;
  if (flightsRef === undefined) {
    flightsRef = getFlightsRef(flight.getTailNumber());
    customRef = false;
  }
  if (!flight.complete()) {
    alert('Please complete the flight form before sumbitting.');
    throw 'Incomplete form';
  }
  return customRef ? await flightsRef.set(flight.json()) : await flightsRef.add(flight.json());
};

export const getCrewMemberData = async (uid) => {
  return await getCrewMemberRef(uid).get();
};