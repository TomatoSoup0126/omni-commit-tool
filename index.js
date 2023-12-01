#!/usr/bin/env node
import prompts from 'prompts'
import chalk from 'chalk'
import commitType from './commitType.js'

const defaultJiraPrefix = 'OCPD'

const commitTypesList = commitType.map(type => ({
  title: type.name,
  description: `${type.emoji} ${type.description}`,
  value: type.value,
  emoji: type.emoji
}))

const choose_type = {
  type: 'autocomplete',
  name: 'commitTypeValue',
  message: 'Pick a commit type.',
  choices: commitTypesList,
  fallback: 'No matched type.'
}

const input_message = {
  type: 'text',
  name: 'commit_message',
  message: prev => {
    const target = commitTypesList.find(type => type.value === prev)
    return `${target.emoji} ${target.title}`
  },
  validate: value => {
    if (!value) {
      return 'Commit message is required.'
    }
    return true
  }
}

const is_jira = {
  type: 'confirm',
  name: 'is_jira',
  message: 'Tag Jira issue ?',
  initial: true
}

const input_jira = {
	type: prev => prev ? 'number' : null,
	name: 'jira_id',
	message: 'Jira issue id',
	onRender () {
    this.msg = chalk.bgBlueBright.white(' Jira issue ID ')
  },
	validate: value => {
		if (!value) {
			return 'Jira issue id is required.'
		}
		return true
	}
}

const input_category = {
  type: 'text',
  name: 'commit_category',
  message: 'Commit Category',
  validate: value => {
    if (!value) {
      return 'Commit Category is required.'
    }
    return true
  }
}

const steps = [
	choose_type,
	input_message,
	is_jira,
	input_jira,
	input_category
]

;(async () => {
	let isCanceled = false

	const response = await prompts(steps, {
    onSubmit: (prompt, answers) => {
      if (answers === undefined) {
        isCanceled = true
        return true
      }
    },
    onCancel: (prompt) => {
      isCanceled = true
      return false
    }
  });

  console.log(response)
	const {
		commitTypeValue,
		commit_message,
		jira_id,
		commit_category
	} = response
	console.log(`[${defaultJiraPrefix}-${jira_id}] ${commitTypeValue}(${commit_category}): ${commit_message}`)
})();