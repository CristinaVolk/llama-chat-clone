# How to run the GPT-CLONE-LLama app:

Required tools:
- NodeJS
- npm or yarn 

In order to install `Node`and `npm` please use [NVM](https://github.com/nvm-sh/nvm). 

[Here is the guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) hot to set up NVM

First the dependencies for the project are need to be installed:

1. Go to the folder `node-server` and run the command:  `npm install` or `yarn install`
2. Go to the folder `react-client` and run the command:  `npm install` or `yarn install`
3. Come back to the root directory `gpt-clone-llama` and hit the command: 
   1. `npm install`  
   2. `npm run start`
   
   _**If any of the dependencies cannot be installed because of the conflicting versions use the command:**_ 

   `npm install --legacy-peer-deps` or `npm install --force`

4. See the messages in the console, 
   1. The server will be running on `http://localhost:8000`
   2. The app will be open on the `http://localhost:5173`





# React + TypeScript + Vite


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
