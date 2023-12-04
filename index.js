#!/usr/bin/env node
import prompts from 'prompts'
import { steps } from './commitStep.js'
import commitType from './commitType.js'

const defaultJiraPrefix = 'OCPD'

;(async () => {
	let isCanceled = false

	const response = await prompts(steps, {
    onSubmit: (prompt, answers) => {
      console.log('answers', answers)
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

  try {
    if (isCanceled) {
      throw new Error('Abort commit')
    }
    console.log(response)
    const {
      commit_type_value,
      commit_message,
      is_jira,
      jira_id,
      issue_category
    } = response

    const jiraString = is_jira ? `[${defaultJiraPrefix}-${jira_id}]` : ''
    const commitString = `${commitType.find(item => item.name === commit_type_value)?.emoji} ${commit_type_value}`
    const categoryString = !!issue_category ? `(${issue_category})` : ''
    console.log(`${jiraString} ${commitString}${ categoryString }: ${commit_message}`)
  } catch (error) {
    console.log('Abort commit')
  }

})();