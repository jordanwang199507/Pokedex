# 🐤 Pokedex

### Simple web app of my own version of Pokemon Pokedex. Exploring front-end parallax effect and practicing simple visual effects.

[🐤 Live Version](https://master.d3psryxyoe1cli.amplifyapp.com/) | [Pokedex Repo](https://github.com/jordanwang199507/Pokedex)

[![made-with-Node](https://img.shields.io/badge/Made%20with-Node.js%20-success)](https://nodejs.org/en/)
[![made-with-React](https://img.shields.io/badge/Made%20with-React%20-blue)](https://React.com/)
[![made-with-PokeAPI](https://img.shields.io/badge/Made%20with-PokeAPI%20-yellow)](https://pokeapi.co/)
[![deployed-on-AWSAmplify](https://img.shields.io/badge/Deployed%20on-AWSAmplify%20-orange)](https://aws.amazon.com/amplify)
---
## 📑Table of Content

- [🐤 Pokedex](#-pokedex)
  - [Table of Content](#table-of-content)
  - [🚙 Getting Started](#-getting-started)
 
---
## 🚙 Getting Started
1. Clone it <br>
   `git clone https://github.com/jordanwang199507/Pokedex`
2. Navigate to the repository<br>
   `cd pokedex`
3. Install all the depndencies <br>
   `npm install`
4. Run the server
   `npm start`
---
## 🧋Adjust CSS style
- All pages are linked to one single style sheet src/style.css. However changes can be made on individual component's style sheet.
- Please follow the steps below:
    1. naviage to style sheet. Ex. PokemonDetailCardToolBar.css
    2. make adjustment on the style sheet
    3. navigate to terminal
    4. on terminal run `npm run build:css`
    5. once complete, run `npm start`
---
## 🧱 Main Structure
```sh
├── public
│  └── fonts                  # contains font assets
├── src
│  ├── assets                 # contains images and svgs
│  ├── type-icons             # pokemon type image assets
│  ├── components             # components that make up the application (JS)
│  └── styles                 # contains stylesheets
├─── package-lock.json
├─── package.json
└─── README.md
```

## 📘 Tech Stack (Dependencies)
- [React](https://react.dev/)
- [mui/icons-material](https://MUI.com/)

## 🔨 Created By

- Jordan Wang @jordanwang199507
