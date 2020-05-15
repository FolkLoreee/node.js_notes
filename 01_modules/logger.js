// mock login purposes, set http requests

const EventEmitter = require("events");

var url = "http://mylogger.io/log";

class Logger extends EventEmitter {
  log(message) {
    //mock send a HTTP request
    console.log(message);
    this.emit("messageLogged", { id: 1, url: "http://" });
  }
}

//exporting the log function:
//module.exports.log = log;
module.exports = Logger;
//exporting the url variable as url_login:
module.exports.url_login = url;

// instead of exporting the log function, can let the object only contain the function
// module.exports = log;
