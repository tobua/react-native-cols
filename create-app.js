#!/usr/bin/env node

import { join } from 'path'
import { promisify } from 'util'
import { exec } from 'child_process'
import copy from 'recursive-copy'
import rimraf from 'rimraf'

const appName = 'ColsApp'

// Enhances source files inside /app with a fresh RN project template.
(async () => {
  const execute = promisify(exec)

  console.log('Initializing fresh RN project...')

  // Initialize RN project.
  await execute(`react-native init ${appName}`)

  // Copy to destination directory, leaving source files untouched.
  const results = await copy(appName, 'app', {
    dot: true,
    overwrite: false,
    filter: ['**/*', '!App.js']
  })

  // Remove temporary project directory.
  rimraf.sync(appName)

  // Install this package locally, avoiding symlinks.
  await execute('npm install $(npm pack .. | tail -1)', {
    cwd: join(__dirname, 'app')
  })

  console.log('🍞 Fresh React Native App created inside /app.')
})()
