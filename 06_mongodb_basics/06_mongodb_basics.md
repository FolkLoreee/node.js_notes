# Basics of MongoDB

## Mongoose

Mongoose is an application data modelling tool for MongoDB.

### Setting up Mongoose

```bash
npm i mongoose
```

```js
const mongoose = require("mongoose");

//in real application, this string will be different
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB"));
```

### Schema

Defining the shape of the document inside MongoDB.

```js
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {type:Date, default: Date.now},
  isPublished: Boolean;
});

```

Schema Types:

- String
- Number
- Date
- Buffer (storing binary data)
- Boolean
- ObjectID (assigning unique identifier)
- Array

### Classes and Objects

e.g. Class is called Course, object is called nodeCourse.
In order to create a class, we need to compile the schema.

```js
const Course = mongoose.model("Course", courseSchema); //creating a class called Course

const course = new Course({
  name: "Node.js Course",
  author: "Me",
  tags: ["node", "backend"],
  isPublished: true,
});
```

### Saving a Document

```js
async function createCourse() {
  const result = await course.save();
  // mongoDB will assign a Unique identifier for this document
}
```

### Querying Documents

```js
async function getCourses() {
  const courses = await Course.find({ author: "Me", isPublished: true }) ///find is also asyncrhonous
    .limit(10) //limit results to 10 data
    .sort({ name: 1 }) //meaning sort in ascending order, -1 is descending
    .select({ name: 1, tags: 1 }); //meaning we only want to display the name and tags (in addition to ID)
  console.log(courses);
}
```

### Comparison Query Operators

- eq (equal)
- ne (not equal)
- gt (greater than)
- gte(greater than equal to)
- lt (less than)
- lte(less than equal to)
- in (in)
- nin (not in)

e.g. finding a course thats more than $10 < $20

```js
.find({price: {$gt: 10, $lte: 20}})

```

e.g. finding a course that 10, 15 or 20 bucks

```js
.find({price: {$in:[10,15,20]}})
```

### Logical Query Operator

```js
.find()
.or([{author:'Me'},{isPublished: true}]) //to find Me or true
//or
.and([{author:'Me'},{isPublished: true}])

```

### Regex

```js
//starts with Me:
.find({author:/^Me/})

//ends with You:
.find({author:/You$/})

//make it case insensitive
.find({author:/You$/i})

//contains "asdf"
.find({author:/.*asdf.*/}) // any character before asdf, and after asdf
```

### Counting

If we want to find out the number of documents,

```js
const courses = await Course.find({ author: "Me", isPublished: true }) ///find is also asyncrhonous
  .limit(10) //limit results to 10 data
  .count();
console.log(courses);
```

### Pagination

to skip certain number of pages

```js
const pageNumber = 2;
const pageSize = 10;
.skip((pageNumber-1) * pageSize)
```

### Updating a Document - Query First

Find the document by id, modify its property, and call save()

```js
async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;
  //Approach 1
  course.isPublished = true;
  course.author = "Author X";
  //Approach 2
  course.set({
    isPublished: true,
    author: "Author X",
  });
  const result = await course.save();
  console.log(result);
}
```

### Updating a Document - Update First

Update first, optionally get the updated document
List of Update operators:
//MongoDB update operators

```js
async function updateCourse(id) {
  const result = await Course.update(
    { _id: id },
    {
      $set: {
        author: "Author Y",
        isPublished: false,
      },
    }
  );
  console.log(result);
}
//another approach:
const course = await Course.findByIdAndUpdate(
  id,
  {
    //  [... still the same as above]
  },
  { new: true }
);
console.log(course);
//without the {new:true}, the result shown is the one before it's updated.
```

### Removing a Document

```js
async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id }); //deletes the first document that it finds
  //there is also deleteMany
  console.log(result);
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
  //returns a null when course with that id is not found
}
```
