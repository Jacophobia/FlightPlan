import firestore from "@react-native-firebase/firestore";
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

export const addCrewMember = async (user, name) => {
  await getCrewMembersRef().doc(user.uid).set({
    name,
    email: user.email,
    uid: user.uid,
  });
};