import chalk from 'chalk'
import commitType from './commitType.js'

const commitTypesList = commitType.map(type => ({
  title: type.name,
  description: `${type.emoji} ${type.description}`,
  value: type.value,
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