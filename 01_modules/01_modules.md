# 01. Global Objects and Modules

## Global Objects

``console.log(), set.Timeout()`` are examples of global objects. 
These objects are the ``node.js`` equivalent to [Window Objects](https://www.w3schools.com/jsref/obj_window.asp)

  Note that when defining variables, they are not added to the global variable. i.e. 
  
  ``` js
  var message = "hello world"
  console.log(global.message) //will return undefined
  console.log(message) //will return hello world
  ```
## Modules
> ``module`` in node.js refers to the different js files within the same project. Variables and functions defined within each ``module`` are ``private``, unless ``exported``.

JavaScript is often modular (split into multiple files), which calls for the need of ``modules``. 

Without ``modules``, all functions defined in each file will be global, and when there are functions with the same name defined in a different file, the former function will be overwritten by the new function.

Hence, we need to create ``modules`` to avoid this issue.

### Exporting modules

In ``node.js``, in order to make a variable / function accessible across module, we need to use 
```js 
module.exports.global_var_name = private_var_name
```

### Loading modules

In ``node.js``, to load a module, we use:
```js
const module_name = require('./module.js')
```
> note that const is used instead of var to avoid overwrites

In order to call the functions or variables within the module:

```js
module_name.function()
```

### Module Wrapper

``node.js`` does not directly execute the js files. Instead, it wraps each module (file) with a ``Module Wrapper Function``:
```js
(function(exports,require, module, __filename, __dirname){
  //your code goes here
})
```
``__filename`` and ``__dirname`` encodes the absolute path to the file and directory that contains the file, respectively.

### Various Modules

#### Path Module
To access file details

```js
const path = require('path')
var pathObj = path.parse(__filename);
```
``pathObj`` is an object that contains the directory and name of the file.

#### OS Module
To access OS details

```js
const os = require('os')
console.log(`Total memory: ${os.totalmem()}. Free memory: ${os.freemem()}`)
```
#### File System Module
To access folder stuff (has both async and sync methods)

```js
const fs = require('fs');

fs.readdir('./', function(err,files){
  if (err) console.log("Error: ", err);
  else console.log(files);

}); //returns the list of files inside the folder
```

#### Events Module
The core of node.js.\
Example of an event: HTTP Request.

```js
const EventEmitter = require('events')
const emitter = new EventEmitter();
```
``EventEmitter`` has 2 important methods: `emit()` and `on()`.
`EventEmitter.on('eventName',args)` turns on the EventListener for future `eventName` raises, and thus must be called before any `eventName` is raised.
`EventEmitter.emit('eventName',args)` raises an event with arguments which will also be passed to EventEmitter.on()