# Task Master App

## Version notes
- node: v20.18.0
- npm: 10.9.0
- Microsoft OpenJDK17 (Java SE Development Kit)
- Android SDK Platform 34
- TypeScript Compiler: 5.6.3

## Set up environment with EAS CLI
### Install EAS CLI:
    In terminal, run: npm install -g eas-cli
### In project, run: 
    eas build:configure
#### Note: "... cannot be loaded because running scripts is disabled on this system"
    - Open PowerShell with Run as Administrator, run: Set-ExecutionPolicy RemoteSigned. After that type Y and press Enter.
    - In project, run: eas build:configure again.
    - After in PowerShell, run: Set-ExecutionPolicy Restricted
### Finally, run to create a development build: 
    eas build --platform android --profile development
#### Details information: https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build