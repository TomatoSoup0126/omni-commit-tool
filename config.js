#!/usr/bin/env node

import prompts from 'prompts'
import { launchEmojiSetting } from './configEmoji.js'
import { launchPrefixSetting } from './configPrefix.js'

const steps = {
  type: 'select',
  name: 'setting_type',
  message: 'Pick Setting',
  choices: [
    {
      title: 'Use emoji ?',
      description: 'Append emoji on commit message ?',
      value: 'emoji',
    },
    {
      title: 'Set Jira prefix ?',
      description: 'Change Jira prefix ?',
      value: 'prefix',
    },
  ]
}

export const launchConfigPrompt = async () => {
  const response = await prompts(steps, {
    onSubmit: (prompt, answers) => {
      if (answers === undefined) {
        return true
      }
    },
    onCancel: (prompt) => {
      return false
    }
  });

  if (response.setting_type === 'emoji') {
    launchEmojiSetting()
  }
  if (response.setting_type === 'prefix') {
    launchPrefixSetting()
  }
}
