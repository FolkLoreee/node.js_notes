const Joi = require('joi'); // a class
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {courseID:1, name: "React.js"},
    {courseID:2, name: "Node.js"},
    {courseID:3, name: "Python Pandas"}
];
//implementing GET request
// This routes the root page to render a 'Hello World'
app.get('/',(req,res)=>{
// arg1 = pass / url
// arg2 = callback function    
    res.send('Hello world');
    // this is called route handler
});

app.get('/api/courses',(req,res)=>{
    res.send([1,2,3]);
});
//courseID could be anything, its a variable.
app.get('/api/courses/:courseID',(req,res)=>{
    const course = courses.find(c=>c.courseID === parseInt(req.params.courseID))
    if (!course){
        res.status(404).send('Course not found!');
        return;
    } 
    res.send(course.name);
    //res.send(req.query);
})

app.post('/api/courses', (req,res)=>{
//    const result = validateCourse(req.body);
//Object destructuring
    const {error} = validateCourse(req.body);
    if (error){
        //400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        courseID: courses.length+1,
        name: req.body.name
    };
    courses.push(course); //POSTing the request
    res.send(course); //returning to the client that there's a new POST
});

app.put('/api/courses/:courseID',(req,res)=>{
    // Look up the course, if it doesnt exist, return 404
    const course = courses.find(c=>c.courseID === parseInt(req.params.courseID))
    if (!course){
        res.status(404).send('Course not found!');
        return;
    } 
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

app.delete('/api/courses/:courseID',(req,res)=>{
    //Look up course
    const course = courses.find(c=>c.courseID === parseInt(req.params.courseID))
    if (!course) res.status(404).send('Course not found!');
    //Delete course
    const index = courses.indexOf(course);
    courses.splice(index, 1)
    //return to client
    res.send(course); 
})
//PORT
const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening on ${port}...`));


function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course,schema);
    
}