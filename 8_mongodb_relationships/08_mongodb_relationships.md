# Modelling Relationships between Connected Data

## Using References (Normalization) [CONSISTENT]

```js
//collection 1
let author = {
  name: "Mosh",
};
//collection 2
let course = {
  author: "id",
};
//in nosql, there's no relationships between the author in collection 2 and 1. Thus, invalid id in collection 2 would still be deemed "valid"
```

## Using Embedded Documents(Denormalization) [FASTER QUERY]

```js
let course = {
  author: {
    name: "Mosh",
  },
};
```

## Hybrid Approach

```js
let author = {
  name: "Mosh",
};
let course = {
  author: {
    id: "ref",
    name: "Mosh",
  },
};
```

##
