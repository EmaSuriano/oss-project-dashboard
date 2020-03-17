# Open Source Github Dashboard

[![Netlify Status](https://api.netlify.com/api/v1/badges/b096e537-bb92-4582-9c48-c55a59860024/deploy-status)](https://app.netlify.com/sites/oss-dashboard/deploys)

<div align="center">
  <a href="https://react-hotkey-tooltip.netlify.com/#/">
    <img alt="logo" src="./doc/logo.png" height="150px" />
  </a>
</div>

<div align="center">
  <strong>A Dashboard to have a quick overview of Open Sources projects in your Github account ✨</strong>
</div>

Powered by [Argon Dashboard ⚛️](https://github.com/creativetimofficial/argon-dashboard-react).

**[Live app ✨][app-link]**

## What does it include? 📦

- Responsive Design
- Simple login with Github
- GraphQL API Github
- Project list powered by Github Gist

This project can be used in two ways:

- Login directly inside the [live app][app-link]. See [Basic setup](#basic-setup).
- Host your own dashboard in order to showcase your maintained projects to others. See [Host your own Dashboard](#host-your-own-dashboard).

## Screenshots 🖼

| Desktop                        | Tablet                       | Mobile                       |
| ------------------------------ | ---------------------------- | ---------------------------- |
| ![Desktop](./docs/desktop.png) | ![Tablet](./docs/tablet.png) | ![Mobile](./docs/mobile.png) |

##

## Basic setup ⚙️

### Requirements 📝

- Have a [Github](https://github.com/) account.
- Have at least one project linked to that account (can be private or public).

### Steps 🏃‍♂️

1. Go to [Github Gists](https://gist.github.com/).
2. Create a new file with the name of `oss-projects.json`.
3. Inside the content of the file add a plain list containing the name of the project that you want to add to the dashboard. Example:

```json
["project-a", "project-b"]
```

4. Open [live app][app-link] and click on Log in with Github.
5. Accept permissions and you should be able to see the dashboard with the information of your projects ✨

## Host your own Dashboard 🙆‍♂️

The main difference with the [live app][app-link] is that login is not needed anymore in order to see the projects and there is no logout option. However the deployed application will show the projects of **only** one user.

This is very handy when you want to showcase your projects to other or when you want to have an easy way to have a quick overview of your maintained projects.

### Steps 🏃‍♂️

1. Go to your [Github Developer Settings](https://github.com/settings/tokens), create a new Auth token and copy its content.
2. Create a `.env` file in the root of the project with the following information

```text
NODE_PATH=./src
REACT_APP_GITHUB_ACCESS_TOKEN_=<<REPLACE_WITH_YOUR_TOKEN>>
```

3. Install dependencies by running `yarn` and then `yarn start` to start the server.

NIT: This project is using `react-scripts` v2, which can build your project and export a static website, so you can easily deploy it anywhere! I recommend building it with [Netlify](http://netlify.com/) because it provides a nice set of tools and it has a great integration with Github.

## Development 🛠

### Component Shadowing out of the box 🤯

Inside the Webpack configuration you can find the plugin of `enhanced-resolve` that allows to reference an alias with one or more possible directories. This gives to the product a similar to `shadowing` in Gatsby.

**Example**

```javascript
// webpack.config.js

config.resolve.plugins = [
  new AliasPlugin(
    'described-resolve',
    [
      {
        name: 'components',
        alias: ['src/components', 'node_modules/my-dep/src/components'],
      },
    ],
    'resolve',
  ),
];

// src/example.js
import MyCoolComponent from 'components/myCoolComponent`;

export default () => <MyCoolComponent />
```

The plugin will first look into the first alias provided, my local `src` folder, if the file is present then it will require that one. Otherwise it will go to the next alias, until the chain ends.

This feature is quite handy when you are working with templates like `argon-dashboard-react`.

## Contribution 💪

I'm always open for Pull Requests and Issues, so don't be afraid of collaborating!

In case you are interested in the project this is the current [Roadmap 🛣](./ROADMAP.md) of features and bug!

## License 📝

MIT.

[app-link]: https://oss-dashboard.netlify.com
