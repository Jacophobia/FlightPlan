export class Credentials {
  constructor({email, password, confirmedPassword, name}) {
    this.email = email;
    this.password = password;
    this.confirmedPassword = confirmedPassword;
    this.name = name;
  }
  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
  getConfirmedPassword() {
    return this.confirmedPassword;
  }
  getName() {
    return this.name;
  }
  setEmail(newVal) {
    this.email = newVal;
    return this;
  }
  setPassword(newVal) {
    this.password = newVal;
    return this;
  }
  setConfirmedPassword(newVal) {
    this.confirmedPassword = newVal;
    return this;
  }
  setName(newVal) {
    this.name = newVal;
    return this;
  }

  validate() {
    if (!this.email || !this.password || !this.name) {
      return {valid: false, error: 'All fields must be filled'};
    }
    if (this.email.length < 5) {
      return {valid: false, error: 'Email is not valid'};
    }
    if (this.password.length < 8) {
      return {valid: false, error: 'Insufficient password length'};
    }
    if (this.password !== this.confirmedPassword) {
      return {valid: false, error: 'Passwords do not match'};
    }
    if (this.name.length < 3) {
      return {valid: false, error: 'Please include your full name'};
    }
    return {valid: true};
  }
}