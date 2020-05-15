const EventEmitter = require('events')
//1 EventEmitter is a class
const emitter = new EventEmitter();
//2 emitter is an object of EventEmitter instance

//4 registering a listener [listener must be registered before emit]
//(first argument is the name of the event)
//(second argument is the callback when the event is heard)
emitter.on('messageLogged', (arg)=>{
    console.log('Listener called', arg);
});
//6 arg will return the object inside event arguments

emitter.emit('messageLogged',{id: 1, url: 'http://'});
//3 sends a signal that an event is occuring (Raising an Event)
//5 id and url are called event arguments, listeners will have access to them.