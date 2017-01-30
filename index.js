'use strict'

module.exports = packgeFiles

function packgeFiles(modules) {
  const files = []
  const cwd = process.cwd()

  modules = typeof modules === 'string'
    ? [modules]
    : modules

  getDependencies(`${cwd}/package.json`)

  return Object
    .keys(files)
    .map(key => files[key])
    .map(path => path.replace(/\.(\/node_modules)/, `${process.env.PWD}$1`))

  function getDependencies(pathToPackageJSON) {
    const packageJSON = require(pathToPackageJSON)

    const dependencies = pathToPackageJSON === `${cwd}/package.json`
      ? Object.keys(packageJSON.dependencies).concat(modules)
      : Object.keys(packageJSON.dependencies)

    dependencies.forEach(dependency => {
      const modulePath = `${cwd}/node_modules/${dependency}`
      const packageJSON = require(`${modulePath}/package.json`)
      getDependencies(`${modulePath}/package.json`)

      if (packageJSON.files) {
        packageJSON.files
          .forEach(getFiles)

        function getFiles(file) {
          const fs = require('fs')
          file = file.replace(/\.\//, '')
          const packageFile = `${modulePath}/${file}`
          try {
            const stats = fs.lstatSync(packageFile)

            if (stats.isDirectory()) {
              const packageFiles = fs.readdirSync(packageFile)
                packageFiles.forEach(file => {
                  pushFile(packageFile.concat('/', file))
                })
            } else {
              pushFile(packageFile)
            }
          } catch (e) {}
        }
      }

      if (packageJSON.main) {
        const mainFile = packageJSON.main.replace(/\.\//, '')
        pushFile(modulePath.concat('/', mainFile))
      }
    })
  }

  function pushFile(pathFile) {
    const pathUnused = files.indexOf(pathFile) === -1
    if (pathUnused) {
      files.push(pathFile)
    }
  }
}
