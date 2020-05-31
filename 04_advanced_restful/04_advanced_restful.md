# Advanced Restful

## Middleware

Takes in a request and returns a response.

Middleware function reads the request, parse it in JSON, (do stuff), returns a response to the client.

An express application basically is a bunch of middlewares.

## Creating Custom Middleware

```js
app.use(function (req, res, next) {
  console.log("Logging...");
  next(); // passes control to the next middleware. without this the response will be stuck at "Logging..."
});
```

Custom middlewares should be created in separate js files.

## Built-in Middleware

```js
app.use(express.json());
app.use(express.urlencoded()); //parses incoming request with urlencoded payloads.
app.use(express.static("public")); //to display static pages / static assets
```

## Working in Different Environments (Development vs Production)

```js
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}
```

```bash
export NODE_ENV=production
```

## Managing Different Configurations

```bash
npm i config
```

make .json setting files under the config folder
e.g.

````json
{
  "name": "APP_DEV"
  "mail":{
    "host": "app-dev-server"
  }
}
```js
const config = require('config');
config.get('name');
config.get('mail.host');
````

### Environment Variable

```bash
export appname_variable=value
```

## Debugging

Logs could be controlled with middlewares.

```bash
npm i debug
```

```js
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}
```

```bash
export DEBUG=app:startup //turning startup debug on
export DEBUG=*           //turning all debugs on
export DEBUG=            //to remove the debuggin function
```

## Templating Engines

PUG 🐶

```bash
npm i pug
```

Not really necessary for building rest API

```js
app.set("view engine", "pug");
app.set("views", "./views");
```

within ./views/index.pug/

```pug
html
  head
    title= title
  body
    h1 = message
```

instead of sending a response, we can render the response.

```js
app.get("/", (req, res) => {
  res.render("index", { title: "the title", message: "the message" });
});
```

## Database Integration

Mongoose
more in 06_mongodb_basics

```bash
npm i mongoose
```

## Structuring Express Application

### Endpoints

Each route / endpoint should be made in a different file.

Remember to import all the dependecies required and to export the router.

In the index.js,

```js
app.use("routerpath", routername);
//e.g.
const courses = require("./routes/courses");
app.use("./api/courses/", courses);
```
