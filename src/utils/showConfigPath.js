import { path } from './getConfig.js'
import chalk from 'chalk'

export const showConfigPath = () => {
  console.log(`${chalk.gray('Config path:')} ${path}/oc-config.json`)
}