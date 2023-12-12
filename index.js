#!/usr/bin/env node

import { launchCommitPrompt } from './src/commit/commitPrompts.js'
import { launchConfigPrompt } from './src/config/config.js'
import { showConfigPath } from './src/utils/showConfigPath.js'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv))
.options({
  'blank': {
    alias: 'b',
    describe: 'Create blank commit'
  },
  'setting': {
    alias: 's',
    describe: 'Set config'
  },
  'path': {
    alias: 'p',
    describe: 'Show config path'
  }
})
.help()
.argv

if (argv.setting) {
  launchConfigPrompt()
} else if (argv.path) {
  showConfigPath()
} else if (argv.blank) {
  launchCommitPrompt({ blank: true })
} else {
  launchCommitPrompt()
}