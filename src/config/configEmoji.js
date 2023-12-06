import fs from 'fs'
import chalk from 'chalk'
import prompts from 'prompts'
import { getConfigFile, path } from '../utils/getConfig.js'

const config = getConfigFile()
const initialUseEmoji = config.useEmoji || false

const steps = [
  {
    type: 'toggle',
    name: 'useEmoji',
    message: 'Use emoji ?',
    initial: initialUseEmoji,
    active: 'Yes',
    inactive: 'No'
  }
]

export const launchEmojiSetting = async () => {
  const response = await prompts(steps);

  try {
    if (response.useEmoji === undefined) {
      throw new Error('Abort setting')
    }
    fs.writeFileSync(
      `${path}/omni-gc-config.json`,
      `${JSON.stringify(
        {
          ...config,
          useEmoji: response.useEmoji
        }, null, 2)
      }`,
    )
    console.log(`${chalk.yellow(` Setting success `)}${chalk.green(` Use emoji: ${response.useEmoji} `)}`)
  } catch (error) {
    console.log(chalk.bgRed.white(' Setting abort '))
  }
}