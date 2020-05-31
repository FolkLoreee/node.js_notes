# Validation

## 'Required' Validation

```js
//e.g.
name: {type: String, required: true}
```

Forces users to fill the 'required' input. Failure to fill the input will throw an error.

```bash
[Collection] validation failed:
[input]: Path [input] is required
```

`UnhandledPromiseRejectionWarning` is an error that `node.js` throws when the promise rejection is not handled (wow).It is always a good practice to :

```js
try {
  //promise success
} catch (ex) {
  //promise reject
}
```

> This validation is only on the Mongoose side, not MongoDB.

> Validation must be done both on client and server side:
> Joi handles the client side, mongoose ensures that the data stored into the database is valid.

## Built-in Validators

### Conditional 'Required'

```js
price:{
    type: Number,
    required: function(){
      return this.isPublished
    }
}
```

### String Length

```js
name:{
    type: String,
    required: true,
    minLength: 5,
    maxLength: 151,
    match: //some regex
}
```

### Enum

```js
category:{
  type: String,
  required: true,
  enum: ['web', 'mobile', 'network']
}
```

### Number and Dates

```js
price:{
  type: Number,
  min: 0,
  max: 99
}
```

## Custom Validators

Scenario: if we need to assign a tag on every course, and we don't want clients to be able to pass an empty array.

```js
tags{
  type: array,
  validate:{
    validator: function(value){
      return value && value.length >0; //first validation means that if value is not a null
    },
    message: 'A course should have at least one tag.'
  }
}
```

## Async Validators

Scenario: If we require validations to be done after receiving certain data.

```js
tags:{
  validate:{
    isAsync: true,
    validator: function(value,callback){
      const result = await value && value.length>0;
      callback(result);
    },
    message: 'A course should have at least one tag.'
  }
}
```

## Validation Errors

```js
try {
  //success promise
} catch (ex) {
  //reject promise:
  for (field in ex.errors) {
    console.log(ex.errors[field]);
  }
}
```

## SchemaType Options

### String Properties

```js
lowercase: true
uppercase: true,
trim: true //its like strip in python
```

### Getter and Setter [For any Type]

```js
get: value=> Math.round(value),
set: value=> Math.round(value)
//this allows the value input and output to be rounded
```

Note that if these custom getter and setter are implemented after the database contains a double, this validator _will not_ alter the value. It will, however, return the rounded value when queried.
