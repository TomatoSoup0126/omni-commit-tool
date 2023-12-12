import chalk from 'chalk'
import commitType from './commitType.js'
import { getConfigFile, path } from '../utils/getConfig.js'

const config = getConfigFile()
const useEmoji = config.useEmoji || false
const jiraPrefix = config.jiraPrefix || 'OCPD'

const commitTypesList = commitType.map(type => ({
  title: type.name,
  description: `${type.emoji} ${type.description}`,
  value: type.name,
  emoji: type.emoji
}))

const choose_type = {
  type: 'autocomplete',
  name: 'commit_type_value',
  message: 'Pick a commit type.',
  choices: commitTypesList,
  fallback: 'No matched type.'
}

const input_message = {
  type: 'text',
  name: 'commit_message',
  message: prev => {
    const target = commitTypesList.find(type => type.value === prev)
    return `${useEmoji ? `${target.emoji} ` : ''}${target.title}`
  },
  validate: value => {
    if (!value) {
      return 'Commit message is required.'
    }
    return true
  }
}

const is_jira = {
  type: 'toggle',
  name: 'is_jira',
  message: 'Tag Jira issue ?',
  initial: false,
  active: 'yes',
  inactive: 'no'
}

const input_jira = {
	type: prev => prev ? 'number' : null,
	name: 'jira_id',
	message: 'Jira issue id',
	onRender () {
    this.msg = chalk.bgBlueBright.white(` Jira issue: ${jiraPrefix}- `)
  },
	validate: value => {
		if (!value) {
			return 'Jira issue id is required.'
		}
		return true
	}
}

const input_issue_category = {
  type: 'text',
  name: 'issue_category',
  message: 'Issue category (optional)'
}

const steps = [
  choose_type,
	input_message,
	is_jira,
	input_jira,
	input_issue_category
]

export {
  steps
}