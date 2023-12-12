#!/usr/bin/env node

import { launchCommitPrompt } from './src/commit/commitPrompts.js'
import { launchConfigPrompt } from './src/config/config.js'
import { showConfigPath } from './src/utils/showConfigPath.js'
import { showCommitTypes } from './src/commit/showTypeList.js'
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
  'config': {
    alias: 'c',
    describe: 'Show config path'
  },
  'types': {
    alias: 't',
    describe: 'Show commit type list path'
  }
})
.help()
.argv

if (argv.setting) {
  launchConfigPrompt()
} else if (argv.config) {
  showConfigPath()
} else if (argv.blank) {
  launchCommitPrompt({ blank: true })
} else if (argv.types) {
  showCommitTypes()
} else {
  launchCommitPrompt()
}