const mongoose = require('mongoose');

//in real application, this string will be different
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB'))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema); //creating a class called Course

async function createCourse() {
    const course = new Course({
        name: 'Raect Course',
        author: 'Me',
        tags: ['Raect', 'frontend'],
        isPublished: true
    });
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const courses = await Course
        .find({ author: 'Me', isPublished: true }) ///find is also asyncrhonous
        .limit(10) //limit results to 10 data
        .sort({ name: 1 }) //meaning sort in ascending order, -1 is descending
        .select({ name: 1, tags: 1 }); //meaning we only want to display the name and tags (in addition to ID)
    console.log(courses);
}
getCourses();