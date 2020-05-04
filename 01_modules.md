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