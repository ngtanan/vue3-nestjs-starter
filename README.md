# Get started

## Prerequisites
  - [NodeJs](https://nodejs.org) LTS (v16.14.2)
  - [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)
  - [Lerna](https://lerna.js.org/)
  - [Docker](https://www.docker.com) ([Docker Desktop](https://www.docker.com/products/docker-desktop) recommended)

## Recommended IDE Setup
- [VSCode](https://code.visualstudio.com/)
- Install the VSCode extension `folke.vscode-monorepo-workspace` to work with monorepo easier
- Install other recommended extensions listed in [`<rootDir>/.vscode/extensions.json`](.vscode/extensions.json)

## Install
```bash
yarn global add lerna
yarn global add @nestjs/cli
yarn initialize # --> this will install packages for both Frontend and Backend
```

## Install/Uninstall packages from workspaces
- install packages: https://github.com/lerna/lerna/tree/main/commands/add#readme
  ```bash
  npx lerna add package-name --scope=workspace-name
  ```
- uninstall packages: https://github.com/lerna/lerna/tree/main/commands/exec#readme
  ```bash
  lerna exec 'yarn remove package-name' --scope=workspace-name
  ```

## Run
- Frontend:
  ```bash
  yarn dev:fe
  ```

- Backend:
  Open another terminal window/tab 
  ```bash
  yarn dev:be
  ```

# Commit message convention
ref: https://www.conventionalcommits.org/en/v1.0.0/
- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- `docs`: Documentation only changes
- `feat`: A new feature
- `fix`: A bug fix
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `test`: Adding missing tests or correcting existing tests,
- `revert`: Revert,
- `wip`: Work in progress, not finished yet
