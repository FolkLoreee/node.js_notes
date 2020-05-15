# Node Package Manager

Checking node / npm version:
`node -v`, `npm -v`

Installing different version of npm:
`sudo npm i -g npm@5.5.1`

## package.JSON

Before creating any node.js application, make sure to configure the package.JSON by `npm init`.

To configure later, do `npm init --yes`

## Installing a npm package

`npm install [package_name]`
Installing an npm package will automatically update the package.JSON.

## Installing dependencies

When transferring our node application, we dont need to include all the different packages. This is because all the dependencies are already stored inside the package.json. Running `npm install` or `npm i` would automatically install all the dependencies inside `package.json`

Excluding npm packages with Git:

1. Make a file called `.gitignore`
2. Inside it, add `node_modules/`

To check:

```sh
git status
```

make sure that `node_modules/` is not inside.

## Semantic Versioning

e.g. `package_name: "a.b.c"`
a: Major -> `a+1.0.0`
b: Minor [when they add a new feature that doesn't break the existing API] -> `a.b+1.0`
c: Patch [when they fix a bug] -> `a.b.c+1`

`package_name: "^4.1.1"` means that the app can use the package as long as the major version is `4`.

Another syntax to specify the same thing is `"4.x"`

To specify `"4.1.x"`: `"~4.1.1"`

To specify `"4.1.1"`: `"4.1.1"` (exact version)

## Listing Installed Packages

```shell
npm list
```

produces the dependency tree.

```shell
npm list --depth=0
```

produces only the _main_ dependency tree.

## Viewing the registry of a package

```shell
npm view package_name
```

```shell
npm view package_name dependencies
```

## Changing the version of a package

```shell
npm i package_name@1.1.1
```

## Updating local package

```shell
npm outdated
```

will show current, wanted, and latest versions of outdated packages.

```shell
npm update
```

will update minor and patch releases.

```shell
npm i -g npm-check-updates
```

```shell
ncu -u
```

will update package.json to the latest releases.
afterwards, we must install this update.

```shell
npm install
```

## Dev Dependencies

Sometimes we require tools to develop the code, but will not be required to deploy our app.

```shell
npm i jshint --save-dev
```

will create a "devDependencies" object in package.json that will not be inside the production build.

## Uninstalling a package

```shell
npm un package_name
```

## Global Packages

Tools that we use for all projects, not just one specific object.

```shell
npm i -g package_name
```

## Publishing a package

```shell
npm init
```

```js
module.exports.add = function (a, b) {
  return a + b;
};
```

```shell
npm adduser
[Enter Username]
[Enter Password]
[Enter Email]

npm publish
```

## Updating a published package

```shell
npm version [major/minor/patch]
npm publish
```
