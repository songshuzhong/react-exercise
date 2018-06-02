module.exports = {
  get body() {
    return this._body;
  },
  set body( data ) {
    this._body = data;
  },
  get status() {
    return this._status;
  },
  set status( status ) {
    this._status = status;
  }
};