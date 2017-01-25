### Install

```
npm install --save package-files
```


### Usage

```js
import packageFiles from 'package-files'

console.log(packageFiles())
// will return an array, contains the reference to all main files, e.g.

[
  '/Users/darlan/projects/mn-prototype-angular/node_modules/angular/index.js',
  '/Users/darlan/projects/mn-prototype-angular/node_modules/angular-animate/index.js',
]
```

#### Important

this module will find only for `main` and `files` (entire directory, or specific files) on package.json of each dependency of your project.

So, if your module offer anything like that

```js
{
  "name": "mn-layout",
  "main": "dist/mn-layout.css",
  "files": [
    "dist" // will return all files in directory
    // if you want only a specific file, specify, e.g.
    "dist/a-other-file.js"
  ],
}
```

the array returned from package-files, will be

```js
[
  '/Users/darlan/projects/mn-prototype-angular/node_modules/mn-layout/dist/mn-layout.css',
  '/Users/darlan/projects/mn-prototype-angular/node_modules/mn-layout/dist/mn-layout.css.map'
]
```

