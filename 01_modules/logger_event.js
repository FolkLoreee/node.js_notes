const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('Logging',(arg)=>{
    console.log('The message is : ', arg.msg);
});

emitter.emit('Logging',{msg:'https://www.google.com'})