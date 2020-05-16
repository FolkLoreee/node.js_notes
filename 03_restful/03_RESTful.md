# RESTful APIs

## About

Most applications nowadays use the Client(Front-end) - Server(Back-end) Architecture. This architecture uses the HTTP protocol. REST is the convention to build such services, through CRUD operations.

## Endpoints

APIs are accessed through endpoints. On the server, we should expose a service on an API such as: `http://website.com/api/api_name` or `http://api.website.com/api_name`. `api_name` are known as resources.

## HTTP Requests

Standard methods:
* `GET`   : to obtain the data
* `POST`  : to create the data
* `PUT`   : to update the data
* `DELETE`: to remove the data

## Express Framework
`npm install express`\
Proper structure for the various routes.

The idea is to use GET to obtain requests from the client and to return the relevant responses from the server.

## Nodemon(itor)

To avoid having to restart the node process after every change made into the modules.\
`npm i -g nodemon`

## Environment Variable

When we deploy the APIs, we won't be able to determine which port to use since every machine could be configured differently. Hence, we use `environment variable`.

### Using PORT environment variable
```js
const port = process.env.PORT || 3000;
```
This is to set the `constant` `port` to the PORT environment variable OR 3000 (if `process.env.PORT` is undefined).

### Setting PORT environment variable
```shell
export PORT=[port_num]
```
replace [port_num] with any port number


## Route Parameters

Sometimes we need to provide different routes branching from the main routes (for example, from courses, we need to access the different course IDs). 

To achieve this, we use `route parameters`.

```js
app.get('/api/courses/:courseID/:chapterID',(req,res)=>{
    res.send(req.params);
});
```
would print an object of the different parameters and the values of the parameters into the browser.

## Query String Parameters

Query string parameters are usually for secondary purposes (e.g. sorting the courses by name)
If we would like to access the query string parameters,
```js
res.send(req.query);
```

## Handling GET Requests

To return the relevant sites based on the courses requested:

```js
const express = require('express');
const app = express();

const courses = [
    {courseID:1, name: "React.js"},
    {courseID:2, name: "Node.js"},
    {courseID:3, name: "Python Pandas"}
];
```
```js
app.get('/api/courses/:courseID',(req,res)=>{
    const course = courses.find(c=>c.courseID === parseInt(req.params.courseID))
    if (!course) res.status(404).send('Course not found!'); //404 Error, because course not found
    res.send(course.name);
})
```
If we were to input an invalid course number and access the browser developer tool, we could see that under the `Network` tab, the `Status` of the page is `404`. 

![Network Screenshot](./Screenshot%20from%202020-05-16%2021-36-20.png)

## Handling POST Request

Similar to `GET` Request, we could use `app.post()` in order to handle a POST Request.

```js
app.use(express.json());
app.post('/api/courses', (req,res)=>{
    const course = {
        courseID: courses.length+1,
        name: req.body.name
    };
    courses.push(course); //POSTing the request
    res.send(course); //returning to the client that there's a new POST
});
```

## Postman

To test various API calls.
e.g. Testing a  `POST` Request: 
1. Put URL
2. In the body, add the object that we're supposed to `POST`
3. Send
   

## Input Validation

We should never trust the users' input:
* user could enter the wrong variables inside the object.
* security reasons.

```js
if (!req.body.name || req.body.name.length< 3){
        //400 bad request
        res.status(400).send('Name is required and should be at min 3 characters');
        return;
    }
```

An easier way: Joi\
`npm i joi`

```js
const Joi = require('joi');
```
under ``app.post()``:
```js
const schema = {
    name: Joi.string().min(3).required();
}
const result = Joi.validate(req.body,schema);
if (result.error){
    res.status(400).send(result.error.details[0].message);
}
```
`result.error` is an object that contains a lot of different parameters of the error.
However, to make it user-friendly, we could just output the `message` which describes the error.

## Handling PUT Request

```js

app.put('/api/courses/:courseID',(req,res)=>{
    // Look up the course, if it doesnt exist, return 404
    const course = courses.find(c=>c.courseID === parseInt(req.params.courseID))
    if (!course) res.status(404).send('Course not found!');
    // Validate, if invalid, return 400 - Bad Request
    const {error} = validateCourse(req.body);
    if (error){
        //400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course.name);
    // If valid, update the course, return the updated course
});
```

## Handling DELETE Request

