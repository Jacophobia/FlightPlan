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

const getPurposesRef = () => {
  const result = firestore()
    .collection("Purposes");
    return result;
};

const getPurposeRef = (id) => {
  const result = getPurposesRef()
    .doc(String(id));
  return result;
}

export const addCrewMember = async (user, name, callback = () => {}) => {
  try {
    await getCrewMembersRef().doc(user.uid).set({
      name,
      email: user.email,
      uid: user.uid,
      admin: false,
    });
    callback();
  }
  catch (error) {
    alert('Unable to add to crew members list. Please contact an administrator to be added manually.');
    console.error(error);
  }
};

// getPlanes, getCrewMemberOptions, getClientOptions, getPrincipleOptions, getPurposeOptions

export const getPlanes = async () => {
  return (await getPlanesRef().get())
    .docs
    .map(doc => {
      const plane = doc.data();
      if (!plane.id) {
        plane.id = doc.id;
      }
      if (!plane.name) {
        plane.name = doc.id;
      }
      return plane;
    });
};

export const getCrewMembers = async () => {
  return (await getCrewMembersRef().get())
    .docs
    .map(doc => {
      const crewMember = doc.data();
      if (!crewMember.id) {
        crewMember.id = crewMember.uid;
      }
      return crewMember;
    })
};

export const getClients = async () => {
  return (await getClientsRef().get())
    .docs
    .map(doc => {
      const client = doc.data();
      if (!client.id) {
        client.id = doc.id;
      }
      return client;
    })
};

export const getPrinciples = async () => {
  return (await getPrinciplesRef().get())
    .docs
    .map(doc => {
      const principle = doc.data();
      if (!principle.id) {
        principle.id = doc.id;

      }
      return principle;
    })
};

export const getPurposes = async () => {
  return (await getPurposesRef().get())
    .docs
    .map(doc => {
      const purpose = doc.data();
      if (!purpose.id) {
        purpose.id = doc.id;
      }
      return purpose;
    })
};

export const getFlights = async () => {
  const flights = [];
  const planes = await getPlanes();
  console.log(planes);
  for (let plane of planes) {
    const recentFlights = await getFlightsRef(plane.id).get();
    recentFlights.docs.forEach(doc => {
      const flight = doc.data();
      flight.id = doc.id;
      console.log(flight);
      flights.push(new Flight(flight));
    });
  }
  return flights;
};

// getCrewMember, getClient, getPrinciple, getPurpose

export const getCrewMember = async (id) => {
  const result = (await getCrewMemberRef(id).get()).data();
  result.id = id;
  return result;
};

export const getClient = async (id) => {
  const result = (await getClientRef(id).get()).data();
  result.id = id;
  return result;
};

export const getPrinciple = async (id) => {
  const result = (await getPrincipleRef(id).get()).data();
  result.id = id;
  return result;
};

export const getPurpose = async (id) => {
  const result = (await getPurposeRef(id).get()).data();
  result.id = id;
  return result;
};

export const getFlight = async (tailNumber, flightId) => {
  const result = (await getFlightRef(tailNumber, flightId).get()).data();
  result.id = flightId;
  return new Flight(result);
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