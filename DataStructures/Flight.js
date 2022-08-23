class Flight {
  constructor({
    tailNumber,
    date,
    departure,
    arrival,
    hobb, // in, out
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
  })
  getTailNumber() {
    return tailNumber;
  }
  getDate() {
    return date;
  }
  getDeparture() {
    return departure;
  }
  getArrival() {
    return arrival;
  }
  getHobb() {
    return hobb; 
  }
  getFlightHours() {
    return flightHours;
  }
  getApuHours() {
    return apuHours;
  }
  getFuel() {
    return fuel;
  }
  getGallons() {
    return gallons;
  }
  getFuelPrice() {
    return fuelPrice;
  }
  getPilotId() {
    return pilotId;
  }
  getCopilotId() {
    return copilotId;
  }
  getClientId() {
    return clientId;
  }
  getPrincipleId() {
    return principleId;
  }
  getPurposeId() {
    return purposeId;
  }
  getLandingFee() {
    return landingFee;
  }
  getReciepts() {
    return reciepts;
  }
}