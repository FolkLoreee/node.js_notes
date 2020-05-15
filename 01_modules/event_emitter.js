const EventEmitter = require("events");
//1 EventEmitter is a class
// const emitter = new EventEmitter();
//2 emitter is an object of EventEmitter instance

const Logger = require("./logger");
const logger = new Logger();

//4 registering a listener [listener must be registered before emit]
//(first argument is the name of the event)
//(second argument is the callback when the event is heard)
logger.on("messageLogged", (arg) => {
  console.log("Listener called", arg);
});
//6 arg will return the object inside event arguments

logger.log("message");
