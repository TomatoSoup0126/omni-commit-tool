#!/usr/bin/env node

import { launchCommitPrompt } from './commitPrompts.js'
import { launchConfigPrompt } from './config.js'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv))
.options({
  'setting': {
    alias: 's',
    describe: 'Set config'
  }
})
.help()
.argv

if (argv.setting) {
  launchConfigPrompt()
} else {
  launchCommitPrompt()
}