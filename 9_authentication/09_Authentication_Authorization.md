# Authentication & Authorization

## Authentication

It's whether the user is who they claim they are.

### Creating User Model

```js
Schema({
  name:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  password:{...}
  email:{...}
});
```

### Lodash

```bash
npm i lodash
```
```js
user = new User(_.pick(req.body, ['name', 'email', 'password']))
await user.save();
res.send(_.pick(user, ['_id','name','email']));

```
```bash
npm i joi-password-complexity
```
### Password Hashing
```bash
npm i bcrypt
```
```js
async function run(){
  const salt = await bcrypt.genSalt(10);
  const hashed = bcrypt.hash('1234', salt);
  console.log(salt);
  console.log(hashed);
}
run();
```

### Authenticating Users
```js
let user =await User.findOne({email: req.body.email});
const validPass = bcrypt.compare(req.body.password,user.password;
//validPass is a boolean
```


## Authorization

It's whether the user is able to access certain stuff.
