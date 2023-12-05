#!/usr/bin/env node

import { launchCommitPrompt } from './commitPrompts.js'
import { launchConfigPrompt } from './config.js'

const args = process.argv

if (args.includes('--config')) {
  launchConfigPrompt()
} else {
  launchCommitPrompt()
}