#!/usr/bin/env node
import prompts from 'prompts'
import { execa } from 'execa'
import chalk from 'chalk'
import { steps } from './commitStep.js'
import commitType from './commitType.js'
import { getConfigFile } from '../utils/getConfig.js'

const config = getConfigFile()

const useEmoji = config.useEmoji || false
const jiraPrefix = config.jiraPrefix || 'OCPD'
const jiraFormat = config.jiraFormat || '[{{prefix}}-{{issueId}}]'

export const launchCommitPrompt = async ({ blank = false, revert = false } = {}) => {

  if (!blank && !revert) {
    try {
      const { stdout } = await execa('git', ['diff', '--cached', '--name-only'])
      
      if (stdout.trim() === '') {
        console.log(chalk.red('No staged files.'))
        return 
      }
    } catch (error) {
      console.log(chalk.red('Error from git'))
      return 
    } 
  }

	let isCanceled = false

  if (revert) {
    const input_revert_target = {
      type: 'text',
      name: 'revert_target',
      message: 'Revert target ?',
      initial: 'commit hash or hash range(hashOld..hashNew)',
      validate: value => {
        if (!value) {
          return 'Revert target is required.'
        }
        return true
      }
    }
    steps.unshift(input_revert_target)
  }

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
      revert_target,
      commit_type_value,
      commit_message,
      is_jira,
      jira_id,
      issue_category
    } = response

    const jiraString = is_jira ?
      jiraFormat
        .replace('{{prefix}}', jiraPrefix)
        .replace('{{issueId}}', jira_id)
      : ''
    const emojiString = useEmoji && !revert ? `${commitType.find(item => item.name === commit_type_value)?.emoji || ''} ` : ''
    const commitString = `${emojiString}${commit_type_value}`
    const categoryString = !!issue_category ? `(${issue_category})` : ''
    const commitMessage = `${jiraString} ${commitString}${categoryString}: ${commit_message}`

    if (blank) {
      await execa('git', ['commit', '--allow-empty', '-m', commitMessage])
      console.log(`Commit success: ${chalk.green(commitMessage)}`)
    } else if (revert) {
      const revertEmoji = useEmoji ? '↺ ' : ''
      const revertPrefix = `${revertEmoji}revert:`
      const revertString = `${revertPrefix} ${commitMessage}`
      await execa('git', ['revert', '--no-commit', revert_target])
      await execa('git', ['commit', '-m', revertString])
      console.log(`Revert success: ${chalk.green(revertString)}`)
    } else {
      await execa('git', ['commit', '-m', commitMessage])
      console.log(`Commit success: ${chalk.green(commitMessage)}`)
    }

  } catch (error) {
    if (error.exitCode === 1) {
      // commit failed
      console.log(chalk.bgRed.white(' Nothing to commit. '))
    } else if (error.exitCode === 128) {
      console.log(chalk.red('Revert failed.'))
    } else {
      console.log(chalk.red('Abort'))
    }
  }
}
