import { addFlight, getCrewMemberData } from "./Firestore";
import { uploadPhoto } from "./Storage";
import { getUid } from "./Auth";
import Flight from "./DataStructures/Flight";
/**
 * Record Flight
 * @param {Flight} flight 
 */
export const recordFlight = async (flight) => {
  const flightRef = await addFlight(flight);
  const fuelReciept = flight.getFuelReciept();
  const landingReciept = flight.getLandingReciept();
  if (!fuelReciept && !landingReciept) {
    alert('Please upload a reciept');
    throw 'Reciept not uploaded';
  }
  if (!!fuelReciept && fuelReciept !== '' && fuelReciept !== [] && fuelReciept !== {}) {
    const fuelUrl = await uploadPhoto(fuelReciept, flight.getTailNumber(), flightRef.id, 'fuelReciept');
    flight.setFuelRecieptUrl(fuelUrl);
  }
  if (!!landingReciept && landingReciept !== '' && landingReciept !== [] && landingReciept !== {}) {
    const landingUrl = await uploadPhoto(landingReciept, flight.getTailNumber(), flightRef.id, 'landingReciept');
    flight.setLandingRecieptUrl(landingUrl);
  }
  await addFlight(flight, flightRef);
}

export const getUserData = async () => {
  const uid = getUid();
  const crewMemberData = (await getCrewMemberData(uid)).data();
  return crewMemberData;
};