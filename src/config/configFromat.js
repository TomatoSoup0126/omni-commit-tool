import fs from 'fs'
import chalk from 'chalk'
import prompts from 'prompts'
import { getConfigFile, path } from '../utils/getConfig.js'

const config = getConfigFile()
const initialJiraFormat = config.jiraFormat || '[{{prefix}}-{{issueId}}]'

const steps = [
  {
    type: 'text',
    name: 'jiraFormat',
    message: 'Set Jira format:',
    initial: initialJiraFormat,
    validate: value => {
      const prefixRegex = /{{prefix}}/g
      const issueIdRegex = /{{issueId}}/g
      if (!prefixRegex.test(value)) {
        return 'Jira format must contain {{prefix}}'
      }
      if (!issueIdRegex.test(value)) {
        return 'Jira format must contain {{issueId}}'
      }
      return true
    }
  }
]

export const launchFormatSetting = async () => {
  const response = await prompts(steps);

  try {
    if (!response.jiraFormat) {
      throw new Error('Abort setting')
    }
    fs.writeFileSync(
      `${path}/oc-config.json`,
      `${JSON.stringify(
        {
          ...config,
          jiraFormat: response.jiraFormat
        }, null, 2)
      }`,
    )
    console.log(`${chalk.yellow(` Setting success `)}${chalk.green(` Set Jira format: ${response.jiraFormat} `)}`)
  } catch (error) {
    console.log(chalk.bgRed.white(' Setting abort '))
  }
}
