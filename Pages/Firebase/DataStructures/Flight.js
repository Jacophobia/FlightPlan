const isComplete = (value, name = '') => {
  let complete;
  if (typeof value === 'string') {
    complete = value !== '';
  }
  else {
    complete = (
      value !== null && 
      value !== undefined && 
      value !== [] && 
      value !== {}
    );
  }
  if (complete) {
    return true;
  }
  else {
    console.log(`${name} is not completed`)
  }
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
    id,
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
    this.id = id

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
    return this.hobbs || {}; 
  }
  getFlightHours() {
    return this.flightHours;
  }
  getApuHours() {
    return this.apuHours;
  }
  getFuel() {
    return this.fuel || {};
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
    return this.reciepts || {};
  }
  getFuelReciept() {
    return this.reciepts.Fuel;
  }
  getLandingReciept() {
    return this.reciepts.Landing;
  }
  getFuelRecieptUrl() {
    return this.fuelRecieptUrl;
  }
  getLandingRecieptUrl() {
    return this.landingRecieptUrl;
  }
  getId() {
    return this.id;
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
  setId(newVal) {
    this.id = newVal;
    return this;
  }
  complete() {
    return (
      isComplete(this.tailNumber, 'tailNumber') &&
      isComplete(this.date, 'date') &&
      isComplete(this.departure, 'departure') &&
      isComplete(this.arrival, 'arrival') &&
      isComplete(this.hobbs?.Out, 'hobbs.Out') &&
      isComplete(this.hobbs?.In, 'hobbs.In') &&
      isComplete(this.flightHours, 'flightHours') &&
      isComplete(this.apuHours, 'apuHours') &&
      isComplete(this.fuel?.Out, 'fuel.Out') &&
      isComplete(this.fuel?.In, 'fuel.In') &&
      isComplete(this.gallons, 'gallons') &&
      isComplete(this.fuelPrice, 'fuelPrice') &&
      isComplete(this.pilotId, 'pilotId') &&
      isComplete(this.copilotId, 'copilotId') &&
      isComplete(this.clientId, 'clientId') &&
      isComplete(this.principleId, 'principleId') &&
      isComplete(this.purposeId, 'purposeId') &&
      isComplete(this.landingFee, 'landingFee') &&
      (
        isComplete(this.reciepts, 'reciepts') || 
        isComplete(this.landingRecieptUrl, 'landingRecieptUrl') || 
        isComplete(this.fuelRecieptUrl, 'fuelRecieptUrl')
      )
    );
  }
  json() {
    const json = {
      tailNumber: typeof this.tailNumber === 'object' ? this.tailNumber.id : this.tailNumber,
      date: new Date(this.date).toISOString(),
      departure: this.departure,
      arrival: this.arrival,
      hobbs: this.hobbs, // in & out
      flightHours: this.flightHours,
      apuHours: this.apuHours,
      fuel: this.fuel, // in & out
      gallons: this.gallons,
      fuelPrice: this.fuelPrice,
      pilotId: typeof this.pilotId === 'object' ? this.pilotId.id : this.pilotId,
      copilotId: typeof this.copilotId === 'object' ? this.copilotId.id : this.copilotId,
      clientId: typeof this.clientId === 'object' ? this.clientId.id : this.clientId,
      principleId: typeof this.principleId === 'object' ? this.principleId.id : this.principleId,
      purposeId: typeof this.purposeId === 'object' ? this.purposeId.id : this.purposeId,
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