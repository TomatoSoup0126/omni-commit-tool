#!/usr/bin/env node

import { launchCommitPrompt } from './commitPrompts.js'

const args = process.argv

if (args.includes('--config')) {
  console.log('go config!')
} else {
  launchCommitPrompt()
}