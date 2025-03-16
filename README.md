# Task Master App

![Node.js](https://img.shields.io/badge/Node.js-v20.18.0-339933?logo=node.js&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-1.22.22-2C8EBB?logo=yarn)
![Java](https://img.shields.io/badge/OpenJDK-17-007396?logo=openjdk)
![Android SDK](https://img.shields.io/badge/Android%20SDK-34-3DDC84?logo=android&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?logo=typescript&logoColor=white)

## Set up environment with EAS CLI

### Install EAS CLI. In terminal, run:

    npm install -g eas-cli

### In project, run:

    eas build:configure

#### Note: You may see a message saying "... cannot be loaded because running scripts is disabled on this system" appear.

#### Open PowerShell with Run as Administrator, run:

    Set-ExecutionPolicy RemoteSigned

#### Then type Y and press Enter. In project, run again:

    eas build:configure

#### After in PowerShell, run:

    Set-ExecutionPolicy Restricted

### Finally, run to create a development build:

    eas build --platform android --profile development

#### Details information: https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build

## Set up in project

### Open terminal and run:

    yarn install

### After:

    npx expo start
