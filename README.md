# Omni commit tool
![](https://img.shields.io/badge/node-18-brightgreen.svg)

Creating a commit made easy.

<img width="540" alt="image" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/091cffa9-73a4-49a2-b2d2-9092b1862c10">

## Section Links

- [Install](#install)
- [Uninstall](#uninstall)
- [Usage](#usage)
   - [Commit Steps](#commit-steps)
   - [Options](#options)
   - [Setting](#setting)



## Install
```shell
npm i -g omni-commit-tool
```

## Uninstall
```shell
npm i -g omni-commit-tool
```

## Usage
```zsh
oc
```
Use `oc` to replace `git commit -m` for the commit message

Omni commit tool will generate commit in the following format:

```
[Jira issue] type (category): message

// example
[OCPD-1260] 💡 feat(test): commit test
```

You can ignore the Jira issue and category to generate a simple commit:
```
type: message

// example
💡 feat: commit test
```


## Commit Steps

1. Choose the desired commit type

   <img width="540" alt="image" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/cd7f6869-161e-4512-83c6-4efaed7d8274">

2. Enter your commit message

   <img width="540" alt="image" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/fc576f19-3726-4a7b-a3f7-7fc408c24238">

3. Decide whether to tag a Jira issue

   <img width="540" alt="image" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/dde1cb31-1282-4e7a-a033-9407bcdbf6f0">

   3.1 If choosing yes, input the Jira issue number.

   <img width="540" alt="image" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/a16cd43e-c862-4fbd-9b33-3b246fe1142a">

4. Enter the commit category if applicable

   <img width="540" alt="image" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/310386b5-5fb9-47cb-a6dc-c59e8954dc2e">

5. Your commit is now complete

   <img width="540" alt="image" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/6e24a33f-f479-470a-b83a-9deee2a1651e">
   



## Options
```zsh
      --version  Show version number
  -b, --blank    Create blank commit
  -s, --setting  Set config
  -c, --config   Show config path
  -t, --types    Show commit type list path
      --help     Show help
```



## Setting
To access the setting panel, use the following command:
```
oc --setting
```

|    Config    | Default  |
|  ----------  | -------  |
|  Use emoji   |   false  |
| Jira prefix  |   OCPD   |
| Jira format  |   [{{prefix}}-{{issueId}}]   |

<br>

<img width="540" alt="image" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/0180d010-8989-4af7-8763-3e4422c1847d">


#### Use emoji
Control emoji is prepended on the commit message

<img width="540" alt="image" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/9118373f-7011-47ed-9038-063b82cd2b52">

#### Set Jira prefix
Change Jira prefix on tag Jira issues

<img width="540" alt="image" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/1f7f3a16-1f84-4801-af9f-9432ed6e3326">

#### Set Jira format
Change Jira format on tag Jira issues, `{{prefix}}` and `{{issueId}}` is required

<img width="540" alt="image" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/3de4c6b3-8348-4e83-93a7-696172c73a21">


## Config path
You can find the config path by running `oc --config` and use an editor to edit it

<img width="618" alt="image" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/c792859e-0271-4aec-a735-57926120ed1b">

## Commit types path
You can find the config path by running `oc --types` and use an editor to edit it

[Default list](https://github.com/TomatoSoup0126/omni-commit-tool/blob/main/src/commit/commitType.js)

<img width="618" alt="image" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/a9350c3f-c43e-4dfe-8ea8-e951f0d8250c">



#### Inspired by [cz-cli](https://github.com/commitizen/cz-cli) and [OwlTing/cz](https://github.com/OwlTing/cz)
