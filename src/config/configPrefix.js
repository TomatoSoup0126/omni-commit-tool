import fs from 'fs'
import chalk from 'chalk'
import prompts from 'prompts'
import { getConfigFile, path } from '../utils/getConfig.js'

const config = getConfigFile()
const initialJiraPrefix = config.jiraPrefix || 'OCPD'

const steps = [
  {
    type: 'text',
    name: 'jiraPrefix',
    message: 'Set Jira prefix:',
    initial: initialJiraPrefix,
  }
]

export const launchPrefixSetting = async () => {
  const response = await prompts(steps);

  try {
    if (!response.jiraPrefix) {
      throw new Error('Abort setting')
    }
    fs.writeFileSync(
      `${path}/oc-config.json`,
      `${JSON.stringify(
        {
          ...config,
          jiraPrefix: response.jiraPrefix
        }, null, 2)
      }`,
    )
    console.log(`${chalk.yellow(` Setting success `)}${chalk.green(` Set Jira prefix: ${response.jiraPrefix} `)}`)
  } catch (error) {
    console.log(chalk.bgRed.white(' Setting abort '))
  }
}