class Account extends Entity {
  static url = "/account"
  static get(id = '', callback){
    createRequest({
      url: this.URL,
      id,
      method: "GET",
      callback
    });
  }
}
