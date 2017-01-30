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

### Important

this module will find only for `main` and `files` (entire directory, or specific files) on package.json of each dependency of your project.

So, if your dependency offer anything like that

```js
{
  "name": "mn-layout",
  "main": "dist/mn-layout.css",
  "files": [
    "dist" // will return all files in directory
    // if you want only a specific file, specify, e.g.
    // "dist/a-specic-file.js"
  ],
}
```


### options

Optionally, you can add more modules manually, adding the module name in a string or array as arguments, e.g.


```js
packageFiles('other-module')
// or

packageFiles(['other-module1', 'module2'])
```

this will get all dependencies of project, (main and files in package), and `other-module` and `module2`.
Is useful to when you want get a `devDependency`, but only specifically, not all.