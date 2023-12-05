#!/usr/bin/env node
import prompts from 'prompts'
import { execa } from 'execa'
import chalk from 'chalk'
import { steps } from './commitStep.js'
import commitType from './commitType.js'

const defaultJiraPrefix = 'OCPD'

export const launchCommitPrompt = async () => {
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

  try {
    if (isCanceled) {
      throw new Error('Abort commit')
    }
    const {
      commit_type_value,
      commit_message,
      is_jira,
      jira_id,
      issue_category
    } = response

    const jiraString = is_jira ? `[${defaultJiraPrefix}-${jira_id}]` : ''
    const commitString = `${commitType.find(item => item.name === commit_type_value)?.emoji || ''} ${commit_type_value}`
    const categoryString = !!issue_category ? `(${issue_category})` : ''
    const commitMessage = `${jiraString} ${commitString}${categoryString}: ${commit_message}`

    await execa('git', ['commit', '-m', commitMessage])

    console.log(`Commit success: ${chalk.green(commitMessage)}`)
  } catch (error) {
    if (error.exitCode === 1) {
      // commit failed
      console.log(chalk.bgRed.white(' Nothing to commit. '))
    } else {
      console.log(chalk.red('Abort'))
    }
  }
}
