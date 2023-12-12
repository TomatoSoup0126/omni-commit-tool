#!/usr/bin/env node

import prompts from 'prompts'
import { launchEmojiSetting } from './configEmoji.js'
import { launchPrefixSetting } from './configPrefix.js'
import { launchFormatSetting } from './configFromat.js'

const steps = {
  type: 'select',
  name: 'setting_type',
  message: 'Pick Setting',
  choices: [
    {
      title: 'Use emoji ?',
      description: 'Prepend emoji on commit message ?',
      value: 'emoji',
    },
    {
      title: 'Set Jira prefix ?',
      description: 'Change Jira prefix ?',
      value: 'prefix',
    },
    {
      title: 'Set Jira format?',
      description: 'Change Jira format ?',
      value: 'format',
    }
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
  if (response.setting_type === 'format') {
    launchFormatSetting()
  }
}
