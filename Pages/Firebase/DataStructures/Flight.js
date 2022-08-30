const isComplete = (value) => {
  return (
    value !== null && 
    value !== undefined && 
    value !== [] && 
    value !== {}
  );
};

/**
 * Flight
 * A single record of a flight and all of it's data.
 */
export default class Flight {
  constructor({
    tailNumber,
    date,
    departure,
    arrival,
    hobbs, // in, out
    flightHours,
    apuHours,
    fuel, // in, out
    gallons,
    fuelPrice,
    pilotId,
    copilotId,
    clientId,
    principleId,
    purposeId,
    landingFee,
    reciepts, // fuel, landing
    fuelRecieptUrl,
    landingRecieptUrl,
  }) {
    this.tailNumber = tailNumber;
    this.date = date || new Date();
    this.departure = departure;
    this.arrival = arrival;
    this.hobbs = hobbs;
    this.flightHours = flightHours;
    this.apuHours = apuHours;
    this.fuel = fuel;
    this.gallons = gallons;
    this.fuelPrice = fuelPrice;
    this.pilotId = pilotId;
    this.copilotId = copilotId;
    this.clientId = clientId;
    this.principleId = principleId;
    this.purposeId = purposeId;
    this.landingFee = landingFee;
    this.reciepts = reciepts;
    this.fuelRecieptUrl = fuelRecieptUrl;
    this.landingRecieptUrl = landingRecieptUrl;


    console.log('new flight created');
  }

  getTailNumber() {
    return this.tailNumber;
  }
  getDate() {
    return this.date;
  }
  getDeparture() {
    return this.departure;
  }
  getArrival() {
    return this.arrival;
  }
  getHobbs() {
    return this.hobbs; 
  }
  getFlightHours() {
    return this.flightHours;
  }
  getApuHours() {
    return this.apuHours;
  }
  getFuel() {
    return this.fuel;
  }
  getGallons() {
    return this.gallons;
  }
  getFuelPrice() {
    return this.fuelPrice;
  }
  getPilotId() {
    return this.pilotId;
  }
  getCopilotId() {
    return this.copilotId;
  }
  getClientId() {
    return this.clientId;
  }
  getPrincipleId() {
    return this.principleId;
  }
  getPurposeId() {
    return this.purposeId;
  }
  getLandingFee() {
    return this.landingFee;
  }
  getReciepts() {
    return this.reciepts;
  }
  getFuelReciept() {
    return this.reciepts.Fuel;
  }
  getLandingReciept() {
    return this.reciepts.Fuel;
  }
  getFuelRecieptUrl() {
    return this.fuelRecieptUrl;
  }
  getLandingRecieptUrl() {
    return this.landingRecieptUrl;
  }

  setTailNumber(newVal) {
    this.tailNumber = newVal;
    return this;
  }
  setDate(newVal) {
    this.date = newVal;
    return this;
  }
  setDeparture(newVal) {
    this.departure = newVal;
    return this;
  }
  setArrival(newVal) {
    this.arrival = newVal;
    return this;
  }
  setHobbs(newVal) {
    this.hobbs = newVal;
    return this; 
  }
  setFlightHours(newVal) {
    this.flightHours = newVal;
    return this;
  }
  setApuHours(newVal) {
    this.apuHours = newVal;
    return this;
  }
  setFuel(newVal) {
    this.fuel = newVal;
    return this;
  }
  setGallons(newVal) {
    this.gallons = newVal;
    return this;
  }
  setFuelPrice(newVal) {
    this.fuelPrice = newVal;
    return this;
  }
  setPilotId(newVal) {
    this.pilotId = newVal;
    return this;
  }
  setCopilotId(newVal) {
    this.copilotId = newVal;
    return this;
  }
  setClientId(newVal) {
    this.clientId = newVal;
    return this;
  }
  setPrincipleId(newVal) {
    this.principleId = newVal;
    return this;
  }
  setPurposeId(newVal) {
    this.purposeId = newVal;
    return this;
  }
  setLandingFee(newVal) {
    this.landingFee = newVal;
    return this;
  }
  setReciepts(newVal) {
    this.reciepts = newVal;
    return this;
  }
  setFuelRecieptUrl(newVal) {
    this.fuelRecieptUrl = newVal;
    return this;
  }
  setLandingRecieptUrl(newVal) {
    this.landingRecieptUrl = newVal;
    return this;
  }
  complete() {
    return (
      isComplete(this.tailNumber) &&
      isComplete(this.date) &&
      isComplete(this.departure) &&
      isComplete(this.arrival) &&
      isComplete(this.hobbs.Out) &&
      isComplete(this.hobbs.In) &&
      isComplete(this.flightHours) &&
      isComplete(this.apuHours) &&
      isComplete(this.fuel.Out) &&
      isComplete(this.fuel.In) &&
      isComplete(this.gallons) &&
      isComplete(this.fuelPrice) &&
      isComplete(this.pilotId) &&
      isComplete(this.copilotId) &&
      isComplete(this.clientId) &&
      isComplete(this.principleId) &&
      isComplete(this.purposeId) &&
      isComplete(this.landingFee) &&
      (
        isComplete(this.reciepts) || 
        isComplete(this.landingRecieptUrl) || 
        isComplete(this.fuelRecieptUrl)
      )
    );
  }
  json() {
    const json = {
      tailNumber: this.tailNumber,
      date: this.date,
      departure: this.departure,
      arrival: this.arrival,
      hobbs: this.hobbs, // in & out
      flightHours: this.flightHours,
      apuHours: this.apuHours,
      fuel: this.fuel, // in & out
      gallons: this.gallons,
      fuelPrice: this.fuelPrice,
      pilotId: this.pilotId,
      copilotId: this.copilotId,
      clientId: this.clientId,
      principleId: this.principleId,
      purposeId: this.purposeId,
      landingFee: this.landingFee,
    };
    if (!!this.fuelRecieptUrl) {
      json.fuelRecieptUrl = this.fuelRecieptUrl;
    }
    if (!!this.landingRecieptUrl) {
      json.landingRecieptUrl = this.landingRecieptUrl;
    }
    return json;
  }
}

export function getTestFlight() {
  return new Flight({
    tailNumber: 'TestTailNumber',
    date: new Date(),
    departure: 'Las Vegas Airport',
    arrival: 'Las Angeles Airport',
    hobbs: {
      In: 5,
      Out: 5,
    },
    flightHours: 5,
    apuHours: 5,
    fuel: {
      In: 5,
      Out: 5,
    },
    gallons: 5,
    fuelPrice: 5,
    pilotId: 'TestPilotId',
    copilotId: 'TestCopilotId',
    clientId: 'TestClientId',
    principleId: 'TestPrincipleId',
    purposeId: 'TestPurposeId',
    landingFee: 5,
    fuelRecieptUrl: 'https://firebasestorage.googleapis.com/v0/b/flighttrack-860aa.appspot.com/o/reciepts%2F1%2FIborjZf7JuU6Z2vkLKbC%2FfuelReciept.jpg?alt=media&token=1ae28da9-03e8-4a56-a1b5-fd7280900c41',
    landingRecieptUrl: 'https://firebasestorage.googleapis.com/v0/b/flighttrack-860aa.appspot.com/o/reciepts%2F1%2FIborjZf7JuU6Z2vkLKbC%2FfuelReciept.jpg?alt=media&token=1ae28da9-03e8-4a56-a1b5-fd7280900c41',
  });
}