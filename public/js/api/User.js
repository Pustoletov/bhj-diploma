class User {
  static url = '/user';

  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  static current() {
    return JSON.parse(localStorage.getItem("user"));
  }

  static unsetCurrent() {
    localStorage.removeItem("user");
  }

  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      method: "GET",
      data: null,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }


  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: "POST",
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: "POST",
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  static logout(data, callback) {
    createRequest({
      url: this.URL + '/logout',
      method: "POST",
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }
}