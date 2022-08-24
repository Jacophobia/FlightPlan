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
  }) {
    this.tailNumber = tailNumber;
    this.date = date;
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
}