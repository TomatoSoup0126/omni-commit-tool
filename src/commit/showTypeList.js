import { dirname } from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'

const path = dirname(fileURLToPath(import.meta.url))

export const showCommitTypes = () => {
  const filePath = `${path}/commitType.js`
  console.log(`${chalk.gray('Type list path:')} ${filePath}`)
}
