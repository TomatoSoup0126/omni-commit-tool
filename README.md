# Omni commit tool
![](https://img.shields.io/badge/node-18-brightgreen.svg)

Creating a commit made easy.

## Install
```shell
npm i -g omni-commit-tool
```

## Uninstall
```shell
npm i -g omni-commit-tool
```

## Usage
```
git-oc
```
Use `git-oc` to replace `git commit -m` for the commit message

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
---

## Steps

1. Choose the desired commit type

   <img width="540" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/374b1c88-5d4d-414f-a529-3837d4a3c975">

2. Enter your commit message

   <img width="540" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/063179bc-48b0-4169-b6d9-3ee33a3354ee">

3. Decide whether to tag a Jira issue

   <img width="540" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/0cdde770-f2cd-4601-bc8f-1e60723d4a66">

   3.1 If choosing yes, input the Jira issue number.

   <img width="540" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/b0767c07-28e0-4506-bddb-0d4c578fb997">

4. Enter the commit category if applicable

   <img width="540" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/bfb7aa8a-abd2-42ef-9d19-a4b4ebe513c0">

5. Your commit is now complete

   <img width="540" src="https://github.com/TomatoSoup0126/omni-commit-tool/assets/49901777/43226661-1550-42a2-b9a4-73f4528e3219">

---

#### Inspired by [cz-cli](https://github.com/commitizen/cz-cli) and [OwlTing/cz](https://github.com/OwlTing/cz)
