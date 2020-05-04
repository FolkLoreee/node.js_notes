// mock login purposes, set http requests

var url = 'http://mylogger.io/log';

function log(message){
    //mock send a HTTP request
    console.log(message);
}

//exporting the log function:
module.exports.log = log;

//exporting the url variable as url_login:
module.exports.url_login = url;

// instead of exporting the log function, can let the object only contain the function
// module.exports = log;