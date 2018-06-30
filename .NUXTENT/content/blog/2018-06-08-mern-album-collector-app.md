---
title: Creating a Full-Stack MERN App from Scratch
tags:
  - JavaScript
  - Markdown
  - Node
  - Nuxt
abstract: This is the first of a series of posts where I describe step-by-step how to build an app from scratch using Mongo, Express, React, and Node. Using the example of a simple CRUD app that allows users upload album artwork and rate albums, I'll touch on configuring Webpack, linting, end-to-end testing, Redux, serverless functions, and more.
---

The project source code can be found here: <https://github.com/thephilgray/review-react-2018/tree/master/005_mern>. A screenshot of the original Figma mockup along with the original Vue prototype can be found here: <https://github.com/thephilgray/designs-2018/tree/master/000_album-collector>.

## Express + React Setup

There's incredible diversity in approaches to structuring a full-stack MERN application. The end results are the same, but it seems that no two are alike, and the Goldilocks principle applies. I spent the better part of a week reviewing boilerplates and tutorials. Each one was either a little outdated, or for my needs, either over-simplistic or too advanced.

But I found one tutorial (link at the bottom of this first section) that presented just the right amount of configuration and explanation to understand how the pieces fit together while also building the foundation. This first section comprises of my notes while following along with that tutorial.

### Initial Config and Project Setup

We'll be building out this project structure:

```txt
├── README.md
├── index.html
├── nodemon.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── client
│   │   ├── App.js
│   │   └── index.js
│   └── server
│       ├── database
│       ├── index.js
│       ├── models
│       ├── routes
├── webpack.config.js

* Generated with tree-cli: https://www.npmjs.com/package/tree-cli
```

The `React` code is in the `client` directory, the `Express` and `Mongo` code is all in the `server` directory. Config files are at the project root.

* Touch `.babelrc`. Preset `env` transforms `babel-preset-2015`, `babel-preset-2016`, and `babel-preset-2017` to es5. Preset `react` allows use of JSX.

```js
// .babelrc
{
  "presets": ["env", "react"],
  "plugins": ["transform-object-rest-spread"]
}
```

* Touch `.eslintrc.json`

```json
//.eslintrc.json
{
  "extends": ["airbnb"],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "no-console": "off",
    "comma-dangle": "off",
    "react/jsx-filename-extension": "off"
  }
}
```

* Touch `webpack.config.js`

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
  entry: "./src/client/index.js", // where the application starts executing and webpack starts bundling
  output: {
    // the target directory and filename for the bundled output
    // __dirname is the directory name of the current module (this config file)
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader" // transform jsx to js
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"] // use css-loader to handler any css files
      }
    ]
  },
  devServer: {
    port: 3000, // listen to port 3000
    open: true, // open home page on startup
    proxy: {
      // for when you have a separate API backend development server and you want to send API requests on the same domain
      "/api": "http://localhost:8080"
    }
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]), // remove the build files before building
    new HtmlWebpackPlugin({
      // loads the template at public/index.html and injects the output bundle
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    })
  ]
};
```

* Touch `nodemon.json`. This watches for any changes in the server source in dev mode and restarts the server.

```js
{
  "watch": ["src/server/"]
}
```

* Create `src/server` directory and touch `index.js`.
* Touch `src/server/sampledata.json`

```js
const express = require("express");

const data = require("./sampledata.json");

const app = express();

const port = process.env.PORT || 8080;
app.use(express.static("dist"));
app.get("/api/albums", (req, res) => res.send(data));
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
```

* npm init and write run scripts in `package.json`

```js
  "scripts": {
    "client":
      "webpack-dev-server --mode development --devtool inline-source-map --hot",
    "server": "nodemon src/server/index.js",
    "dev": "concurrently \"npm run server\" \"npm run client \""
  },
```

* Install dependencies

```bash
yarn add express react react-dom axios
yarn add -D babel-core babel-jest babel-loader babel-preset-env babel-plugin-transform-object-rest-spread babel-preset-react body-parser clean-webpack-plugin concurrently css-loader eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jest eslint-plugin-jsx-a11y eslint-plugin-react html-webpack-plugin jest morgan nodemon style-loader webpack webpack-cli webpack-dev-server
```

* Create `src/client` and touch `index.js`

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

* Touch `App.js`

```js
import React from "react";
import axios from "axios";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { albums: null };
  }
  componentDidMount() {
    axios.get("/api/albums").then(res => this.setState({ albums: res.data }));
  }
  render() {
    return (
      <div>
        {this.state.albums !== null ? (
          this.state.albums.map(album => <h2 key={album._id}>{album.title}</h2>)
        ) : (
          <p>Loading....</p>
        )}
      </div>
    );
  }
}
```

* Touch `public/index.html` and `public/favicon.ico`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>React App</title>
</head>
<body>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <div id="root"></div>
</body>

</html>
```

Source: <https://hackernoon.com/full-stack-web-application-using-react-node-js-express-and-webpack-97dbd5b9d708>

TODO: Review: <https://www.robinwieruch.de/minimal-react-webpack-babel-setup/>

TODO: Watch for updates: <https://github.com/Hashnode/mern-starter>

## Connect to MongoDB

The notes in these next three sections are primarily influenced by the projects I worked on in the [Codecademy TDD Intensive course](https://www.codecademy.com/pro/intensive/test-driven-development).

* Start MongoDB locally

```bash
mongod -dbpath ~/data/db
```

* Or provision a new db through MLAB. Create a username and password for the db. Add the username and password to the link from MLAB. Create a `.env` file and set `DATABASE_URL` to the full link.

* Install `mongoose`

```bash
yarn add -D mongoose
```

* Create `src/server/database/index.js`

```js
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const env = process.env.NODE_ENV || "development";
const databaseUrl =
  process.env.DATABASE_URL || `mongodb://localhost/mern_${env}`;

module.exports = {
  mongoose,
  databaseUrl
};
```

* Connect to mongoose before starting the express app

_Later, we'll set the DATABASE_URL in `.env` to connect to a Mongo db on MLAB when running in production._

## Server Testing

* Add `ESLint` support for `Jest`

```js
{
  "extends": ["airbnb"],
  "env": {
    "browser": true,
    "node": true,
    "jest/globals": true
  },
  "rules": {
    "no-console": "off",
    "comma-dangle": "off",
    "no-underscore-dangle": "off",
    "react/jsx-filename-extension": "off"
  },
  "plugins": ["jest"]
}
```

* Add a `test` script to `package.json`

```js
  "scripts": {
  //...other scripts
    "test": "jest"
  }
```

### Write initial server tests and routes (confirm setup)

* Touch `src/server/routes/index.test.js`
* Write a test for GET `/`

```js
const { assert } = require("chai");
const request = require("supertest");

const app = require("../../server/");

describe("GET `/api`", () => {
  it("should return a JSON message and a status of 200", async () => {
    const response = await request(app).get("/api");

    assert.equal(response.status, 200);
    assert.include(response.body, {
      message: "root"
    });
  });
});
```

* Touch 'src/server/routes/index.js'

```js
const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    message: "root"
  });
});

module.exports = router;
```

* Update express app to use route and run on a separate port for testing

```js
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { mongoose, databaseUrl } = require("./database");
const routes = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(express.static("dist"));

app.use("/api/", routes);

const port = process.env.PORT || 8080;
if (process.env.NODE_ENV === "test") {
  mongoose.connect(databaseUrl).then(() => {
    app.listen(7000, () => console.log("Listening on http://localhost:7000"));
  });
} else {
  mongoose.connect(databaseUrl).then(() => {
    app.listen(port, () =>
      console.log(`Listening on http://localhost:${port}`)
    );
  });
}

module.exports = app;
```

* Create a post route to add an album

```js
// src/server/routes/index.test.js

const { assert } = require("chai");
const request = require("supertest");

const Album = require("../models/");
const { mongoose, databaseUrl } = require("../database");

const app = require("../../server/");

const newAlbum = {
  title: "Space is the Place",
  artist: "Sun Ra",
  art:
    "https://upload.wikimedia.org/wikipedia/en/6/6c/Space_Is_The_Place_album_cover.jpg",
  year: "1973",
  rating: 5
};

// setup and teardown utilities
async function connectDatabase() {
  await mongoose.connect(databaseUrl);
  await mongoose.connection.db.dropDatabase();
}

async function disconnectDatabase() {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
}

describe("/api/albums", async () => {
  // setup and teardown utilities
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe("Server path: `/api/albums/add`", () => {
    describe("POST", () => {
      it("should return a `201` status code when creating a new album", async () => {
        const response = await request(app)
          .post("/api/albums/add")
          .send(newAlbum);

        assert.equal(response.status, 201);
      });
    });
  });
});

// src/server/routes/index.js

const router = require("express").Router();

const Album = require("../models");

router.get("/albums", async (req, res) => {
  const albums = await Album.find({}).exec();
  res.json(albums);
});

router.post("/albums/add", async (req, res) => {
  const newAlbum = await new Album(req.body);
  await newAlbum.save();
  const album = await Album.findOne(req.body);
  res.status(201).json(album);
});

module.exports = router;
```

* Create the model
* Touch `src/server/models/index.js`

```js
const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  title: {
    type: String
  },
  artist: {
    type: String
  },
  art: {
    type: String
  },
  year: {
    type: String
  },
  rating: {
    type: Number
  }
});

module.exports = mongoose.model("Album", albumSchema);
```

* Get all albums

```js
// src/server/routes/index.test.js

// ...imports and other tests

describe("GET `/api/albums`", () => {
  it("should return a status of 200", async () => {
    const response = await request(app).get("/api/albums");

    assert.equal(response.status, 200);
  });

  it("should return an array of albums", async () => {
    await request(app)
      .post("/api/albums/add")
      .send(newAlbum);

    const response = await request(app).get("/api/albums");

    assert.include(JSON.stringify(response.body), newAlbum.title);
    assert.equal(response.body.length, 1);
  });
});
```

## Feature Testing

`Enzyme` is awesome for feature-testing React. It's easy to setup and the DOM manipulation and traversal API is intuitive. It actually renders whatever components you're testing and allows you to assert against that rendered code. I definitely intend to use it in this project.

However, by itself, it doesn't give me full confidence and is a little onerous in a test-driven environment, where it would be preferable to write the very first feature tests against the DOM and not an abstraction.

I've had good experiences with `Storybook`, which lets you develop your components in isolation, ideally the way you would write your tests. Creating stories and being able to interact with default states and different edge cases in the browser gives me a lot more confidence when I'm starting out and it's great for design. But it's not a stand-in for an automated test suite.

I want my feature/integration testing pyramid to include a small suite of end-to-end tests backed by a more complete stack of granular Enzyme tests.

Originally, I thought to use Webdriver.io, but after several daunting experiences struggling with the initial setup, I decided to finally try out `Cypress`, which has a wonderful [set of videos about testing a simple React app](https://docs.cypress.io/examples/examples/tutorials.html#Test-a-React-Todo-App), and can be used in a similar Behavior-Driven approach that I used to test individual components with `Storybook` but with the addition of robust automation features that make it ideal for integration testing.

### Setup Cypress

* Install cypress

```bash
yarn add -D cypress
```

* Add cypress command to `package.json` scripts and add `jest` config to ignore `Cypress` tests

```js
// package.json

  "scripts": {
  // ...other scripts
    "cypress": "cypress open",
    "test": "jest --watch"
  },
  "jest": {
    "testPathIgnorePatterns": ["/node_modules/", "/cypress/"]
  },
```

* Run cypress for the first time

```bash
yarn cypress
```

Cypress will create some `cypress.json` config file at the project root as well as a `cypress` directory which includes the following directories:

```txt
./cypress

├── fixtures
├── integration
├── plugins
├── screenshots
└── support
```

* Remove the sample files in `fixtures` and `integration`. We'll be writing our tests inside `integration`.

Our project structure now resembles this:

```txt
├── README.md
├── cypress
│   ├── fixtures
│   ├── integration
│   ├── plugins
│   │   └── index.js
│   ├── screenshots
│   │   └── my-image.png
│   └── support
│       ├── commands.js
│       └── index.js
├── cypress.json
├── index.html
├── nodemon.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── client
│   │   ├── App.js
│   │   └── index.js
│   └── server
│       ├── database
│       │   └── index.js
│       ├── index.js
│       ├── models
│       │   └── index.js
│       ├── routes
│       │   ├── index.js
│       │   └── index.test.js
│       └── sampledata.json
├── webpack.config.js
└── yarn.lock
```

### Write First Feature Tests with Cypress

_Disclaimer: This is my first time to test drive Cypress._ 🎉

* Add the devServer url as the `baseUrl` to `cypress.json`

```js
// ./cypress.json

{
    "baseUrl": "http://localhost:3000"
}
```

* Touch `cypress/integration/app-init.spec.js`

```js
// cypress/integration/app-init.spec.js

describe("App intitialization", () => {
  it.only("should contain the `CardGrid` component", () => {
    cy.visit("/").get(".CardGrid");
  });
});
```

* Start the `Webpack` dev server with `yarn dev` and then `Cypress` with `yarn cypress` and click `Run All Tests`
* There is no element with the class `.CardGrid`; the test should fail
* Touch `src/client/components/CardGrid.js`

```js
// src/client/components/CardGrid.js

import React from "react";

const CardGrid = () => (
  <div className="CardGrid">
    <p>Card</p>
  </div>
);

export default CardGrid;
```

* Import and use this component inside the `App` component, removing the old code that fetched data directly from the server

```js
// src/client/App.js

import React from "react";

import CardGrid from "./components/CardGrid";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <CardGrid />
      </div>
    );
  }
}
```

The first test should now be passing. But we're not done with it. We really want to make sure that the component renders the data it receives as props. These next steps will closely follow the video tutorial.

* Touch `cypress/fixtures/albums.json`
* Copy the sample data array into this file

```js
[
  {
    _id: "1521567322",
    title: "Space is the Place",
    artist: "Sun Ra",
    art:
      "https://upload.wikimedia.org/wikipedia/en/6/6c/Space_Is_The_Place_album_cover.jpg",
    year: "1973",
    rating: 5
  },
  {
    _id: "1521567405",
    title: "Lanquidity",
    artist: "Sun Ra",
    art: "https://upload.wikimedia.org/wikipedia/en/2/22/Lanquidity.jpg",
    year: "1978",
    rating: 5
  }
  // ... other albums
];
```

* Rewrite the test in `app-init.spec.js`

```js
// cypress/itegration/app-init.spec.js

describe("App intitialization", () => {
  it.only("Loads todos on page load", () => {
    cy.server();
    cy.route("GET", "/api/albums", "fixture:albums");
    cy.visit("/");

    cy.get(".CardGrid .Card").should("have.length", 7);
  });
});
```

* Touch `src/client/lib/service.js`

```js
import axios from "axios";

export const loadAlbums = () => axios.get("/api/albums"); //eslint-disable-line
```

* Call `loadAlbums()` in `src/client/App.js`

```js
// src/client/App.js

/**
 * Essentially the same as earlier,
 * but the Axios request was moved into a separate file.
 **/

import React from "react";
import { loadAlbums } from "./lib/service";
import CardGrid from "./components/CardGrid";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { albums: null };
  }

  componentDidMount() {
    loadAlbums().then(({ data }) => {
      this.setState({ albums: data });
    });
  }
  render() {
    return (
      <div>
        <CardGrid albums={this.state.albums} />
      </div>
    );
  }
}
```

* Map over a div with the class `.Card` inside the `CardGrid` component

```js
import React from "react";
import PropTypes from "prop-types";

const CardGrid = props => (
  <div className="CardGrid">
    {props.albums !== null
      ? props.albums.map(album => (
          <div className="Card" key="album._id">
            <h2>{album.title}</h2>
          </div>
        ))
      : null}
  </div>
);

CardGrid.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object)
};

CardGrid.defaultProps = {
  albums: [{}]
};

export default CardGrid;
```

Now the test is passing, and even though our server is already prepared to handle this api route, we can test the component in isolation by stubbing the request and using fixture data.

One thing I'm already thinking about is that it's not going to be practical using class selectors, as I plan to build out my components with styled-components.

A quick search leads me to this recommendation:

> "Best Practice: Use data-\* attributes to provide context to your selectors and insulate them from CSS or JS changes."

* <https://github.com/cypress-io/cypress/issues/1212>
* <https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements>

So, let's start to use styled-components and change our tests to use the `data-cy` selector for DOM traversal.

* Update the test in `app-init.spec.js` to use data attribute selectors. Also, assert that

```js
// cypress/integration/app-init.spec.js

describe("App intitialization", () => {
  it.only("Loads todos on page load", () => {
    cy.server();
    cy.route("GET", "/api/albums", "fixture:albums");
    cy.visit("/");

    cy.get("[data-cy=Card]").should("have.length", 7);
  });
});
```

* Add `src/client/index.css` to apply global `box-sizing: border-box`.

```css
/*  src/client/index.css */

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}
```

* Install `styled-components` and `babel-plugin-styled-components`

```bash
yarn add styled-components
yarn add -D babel-plugin-styled-components
```

If you like styled-components but don't like how it turns your class names into rubbish hashes, `babel-plugin-styled-components` prepends those hashes with BEM-style names based on the names of the actual components.

```js
// .babelrc
{
  "presets": ["env", "react"],
  "plugins": ["transform-object-rest-spread", "babel-plugin-styled-components"]
}
```

* Touch `src/client/components/Card.js`

```js
// src/client/components/Card.js

import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const CardWrapper = styled.div`
  position: relative;
  width: 310px;
  padding: 1em 0.5em;
  box-shadow: 1px 4px 2px 1px #aaa;
  margin: 0.5em;
  background: #eee;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: 1px 4px 2px 2px #aaa;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
`;

const CardImageWrapper = styled.div`
  position: relative;
  height: 294px;
  width: 294px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const CardBody = styled.div`
  display: flex;
  background: #ddd;
  padding: 0.5em;
  width: 100%;
`;

const CardDetails = styled.div`
  flex: 60%;

  h3 {
    margin: 0;
    line-height: 1.5;
    word-break: break-word;
  }

  p {
    margin: 0;
  }

  & > h3 + p {
    margin-top: 0;
    word-break: break-all;
  }
`;

const CardControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 2em;
  justify-content: center;
  align-items: center;
`;

const CardButton = styled.button`
  padding: 0.25em;
  background: transparent;
  border-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CardWrapper data-cy="Card">
        <CardImageWrapper>
          <CardImage src={this.props.art} />
        </CardImageWrapper>
        <CardBody>
          <CardDetails>
            <h3>{this.props.title}</h3>
            <p>by {this.props.artist}</p>
            <p>{this.props.year}</p>
          </CardDetails>
          <CardControls>
            <CardButton aria-label="Edit this album">Edit</CardButton>
            <CardButton aria-label="Delete this album">Delete</CardButton>
          </CardControls>
        </CardBody>
      </CardWrapper>
    );
  }
}

Card.propTypes = {
  artist: PropTypes.string,
  art: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.string
};
Card.defaultProps = {
  art: "http://via.placeholder.com/300x300",
  title: "Unknown title",
  artist: "Unknown artist",
  year: "Unknown year"
};
export default Card;
```

* Use the `Card` component within the `CardGrid` component, passing each `album` object property down as a prop to `Card`

```js
// src/client/components/CardGrid.js

// ...imports

import Card from "./Card";

const CardGrid = props => (
  <div data-cy="CardGrid">
    {props.albums !== null
      ? props.albums.map(album => <Card {...album} key={album._id} />)
      : null}
  </div>
);
```

* Run the test again or if `Cypress` is still open, refresh it. It should now pass.

We've just barely scratched the surface of what we can do with Cypress. More to come.

Source: <https://docs.cypress.io/examples/examples/tutorials.html#Test-a-React-Todo-App>

### Setup Enzyme

* Install `enzyme` and `enzyme adapter`

```bash
yarn add --D enzyme enzyme-adapter-react-16 enzyme-to-json
```

* Touch `setupTests.js`

```js
// setupTests.js

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
```

* Add `setupTestFrameworkScriptFile` path to `jest` config in `package.json`

```js
// package.json

  "jest": {
  //...other config
    "setupTestFrameworkScriptFile": "./setupTests.js"
  },
```

* Touch `src/client/__tests__/Card.test.js`

```js
// src/client/__tests__/Card.test.js

import React from "react";
import { shallow } from "enzyme";

import Card from "../components/Card";

describe("Card", () => {
  it("renders", () => {
    const wrapper = shallow(<Card />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a card title by default", () => {
    const wrapper = shallow(<Card />);
    expect(wrapper.find("h3").text()).toBe("Unknown title");
  });
});
```

TODO: review <https://www.robinwieruch.de/react-testing-tutorial/>

### Setup Storybook

As mentioned earlier, storybook is particularly well-suited for quickly prototyping and visually tweaking components in isolation. I'll use other tools like `Jest/Enzyme` and `Cypress` for testing functionality integration but `Storybook` will be my atomic playground.

The setup is easy, and it's really satisfying to have this extra little dev server for tinkering with components.

* Install `Storybook` globally and run `get storybook`

```bash
npm i -g @storybook/cli
getstorybook
```

* `Storybook` will install all dependencies and automatically add nom scripts to `package.json`.

The project now looks like this:

```txt
├── README.md
├── cypress
│   ├── fixtures
│   │   └── albums.json
│   ├── integration
│   │   └── app-init.spec.js
│   ├── plugins
│   │   └── index.js
│   ├── screenshots
│   │   └── my-image.png
│   └── support
│       ├── commands.js
│       └── index.js
├── cypress.json
├── index.html
├── nodemon.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── setupTests.js
├── src
│   ├── client
│   │   ├── App.js
│   │   ├── __tests__
│   │   │   ├── Card.test.js
│   │   │   └── __snapshots__
│   │   ├── components
│   │   │   ├── Card.js
│   │   │   └── CardGrid.js
│   │   ├── index.css
│   │   ├── index.js
│   │   └── lib
│   │       └── service.js
│   └── server
│       ├── database
│       │   └── index.js
│       ├── index.js
│       ├── models
│       │   └── index.js
│       ├── routes
│       │   ├── index.js
│       │   └── index.test.js
│       └── sampledata.json
├── stories
│   └── index.stories.js
├── webpack.config.js
└── yarn.lock
```

* Run `storybook` to start the dev server on port 6006

```bash
yarn storybook
```

* Import a component and add a story to `stories/index.stories.js`

```js
import React from "react";
// ...boilerplate imports
import { storiesOf } from "@storybook/react";

import Card from "../src/client/components/Card";

// ...boilerplate stories

storiesOf("Card", module).add("default", () => <Card />);
```

Storybook runs outside of your app, and really forces you to think about how your components look and function in isolation. This is great if you any notion of reusing them elsewhere or building up a UI library. But keep in mind, you'll have to bring or mock your own state, global styles, and Webpack configuration.

One example already evident with this first story is that the box-sizing styles I imported into the `index.js` of the React app have no effect here

Another example that will come up soon is that I'll want to use Webpack for loading SVG icons, which means I'll need to extend `webpack.config.js` in `.storybook/` in addition to `webpack.config.js` at the root of the project.

Some things are not immediately intuitive. But the small hurtles will challenge you to create more usable, modular, and reusable UI.

## State Management

We want a central store to keep track of some of the client state, for instance, if the user is authenticated or not, the user id, state of certain UI affecting the whole page or numerous components, and the user's albums or anything else we want to cache from the server to cut down on network requests.

### Setup Redux

There are many options, but `redux` is still the go-to tool for state management in `React`. As the project grows even a little, its benefits greatly outweigh the slight extra complexity of reducers, actions, and composing over components
with mapper functions.

Questions will naturally arise about when to use the Redux store vs. local state vs. local storage and when to bypass the store altogether and query the database directly via our Express api.

* Install `redux`, `react-redux`, and `redux-thunk`

```bash
yarn add redux react-redux redux-thunk
```

> Touch `src/client/store/index.js` (this step includes setting up standard middleware `thunk` for asynchronous actions and the react dev tools; to use the latter, install the react dev tools extension for your browser)

```js
// src/client/store/index.js

import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export default store;
```

* Touch `src/client/reducers/index.js`

```js
// src/client/reducers/index.js

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
```

* Import the store and provider into `src/client/index.js` and wrap the top-level component

```js
// src/client/index.js

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store/";
import "./index.css";

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
```

## Implement features

Now that we've setup Webpack, Mongo, Express, React, Redux, and various testing tools, let's actually implement some features.

Here's a list of some features for consideration:

* Pagination, or page views for the main CardGrid component when there are too many items for one page.
* Lazy-loading those page views, so we don't get more data than we actually need to display to the user at one time.
* Filter, sort, and search utility menu that is compatible with the pagination or lazy loading described above.
* An auth workflow. Anonymous users will have read access to all albums in the database. However, if they want to add an album to their own collection, create an album, or edit one of the albums they've created or added to their collection, they will need to login. This should include a login page and signup page.
* The user collection page.
* The add album form with validation and an image upload feature.
* The edit album form.

### Pagination

Given 7 records and a max of 5 records per page, the page should render 5 records and there should be a link to the next page.

* Start Mongodb:`mongod`

* In another terminal tab, start the dev server: `yarn dev`
* In another terminal tab, start Cypress: `yarn cypress`

We already have a Cypress test that stubs a call to the API, gives us 7 items, and asserts that 7 cards are on the page. We'll want to replace this 7 with a variable. For testing, we'll be using 5 as the `maxItemsPerPage`.

* Update the first test to assert that there should be greater than 0 items as a result of the API request.
* Write a second tests to assert that there should be `maxItemsPerPage` items or less.

```js
// cypress/integration/app-init.spec.js

describe("App intitialization", () => {
  beforeEach(() => {
    cy.server();
    cy.route("GET", "/api/albums", "fixture:albums");
    cy.visit("/");
  });

  it("Loads todos on page load", () => {
    cy.get("[data-cy=Card]").should("have.length.above", 0);
  });

  it("Loads no more than `maxItemsPerPage` on page load", () => {
    const maxItemsPerPage = 5;
    cy.get("[data-cy=Card]").should("have.lengthOf", maxItemsPerPage);
  });
});
```

This first test fails.

Let's start by chunking the albums array in the `CardGrid` component.

```bash
yarn add lodash
```

```js
// src/client/components/CardGrid.js

import React from "react";
import PropTypes from "prop-types";
import { chunk } from "lodash";

import Card from "./Card";

const maxItemsPerPage = 5;
const pages = albums => chunk(albums, maxItemsPerPage);

const CardGrid = props => (
  <div data-cy="CardGrid">
    {props.albums
      ? pages(props.albums)[0].map(album => <Card {...album} key={album._id} />)
      : null}
  </div>
);

CardGrid.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object)
};

CardGrid.defaultProps = {
  albums: [{}]
};

export default CardGrid;
```

Now we're only showing the first five pages. Instead of manually accessing the first page with [0], let's store the current page number in local state. We'll need to change this stateless functional component to a class component.

```js
// src/client/components/CardGrid.js

import React from "react";
import PropTypes from "prop-types";
import { chunk } from "lodash";

import Card from "./Card";

class CardGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxItemsPerPage: 5,
      currentPageIndex: 0
    };
    this.pages = this.pages.bind(this);
  }
  pages(albums) {
    return chunk(albums, this.state.maxItemsPerPage);
  }

  render() {
    return (
      <div data-cy="CardGrid">
        {this.props.albums
          ? this.pages(this.props.albums)[this.state.currentPageIndex].map(
              album => <Card {...album} key={album._id} />
            )
          : null}
      </div>
    );
  }
}

CardGrid.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object)
};

CardGrid.defaultProps = {
  albums: [{}]
};

export default CardGrid;
```

Let's make sure there's a next and previous button and that when it's clicked it causes the page to render the next page of items.

```js
// cypress/integration/app-init.spec.js

// ...other tests

it("Renders a next button", () => {
  cy.get("button[data-cy=nextPage]");
});

it("should display the next page of results when the next page is button", () => {
  cy.get("button[data-cy=nextPage]").click();
  cy.get("[data-cy=Card]").should("have.lengthOf", 2);
});
```

Now, let's create a higher-order component to wrap our CardGrid and handle pagination. We'll be able to expand on this and re-use it in our app.

```js
// src/client/components/withPages.js

import React from "react";
import PropTypes from "prop-types";
import { chunk } from "lodash";
import styled from "styled-components";

const PageButton = styled.button``;

const withPages = WrappedComponent => {
  class WithPages extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        maxItemsPerPage: props.maxItemsPerPage,
        pages: null,
        numberOfPages: 1,
        currentPageIndex: 0
      };
      this.pages = this.pages.bind(this);
      this.nextPage = this.nextPage.bind(this);
      this.prevPage = this.prevPage.bind(this);
    }

    componentDidMount() {
      const pages = this.pages(this.props.items);
      const numberOfPages = pages.length;
      this.setState({ pages, numberOfPages });
    }

    pages(items) {
      return chunk(items, this.state.maxItemsPerPage);
    }
    nextPage() {
      this.setState(prevState => {
        const nextPageIndex = prevState.currentPageIndex + 1;
        return { currentPageIndex: nextPageIndex };
      });
    }

    prevPage() {
      this.setState(prevState => {
        const prevPageIndex = prevState.currentPageIndex - 1;
        return { currentPageIndex: prevPageIndex };
      });
    }

    render() {
      return (
        <div>
          {this.state.pages !== null ? (
            <WrappedComponent
              {...this.props}
              items={this.state.pages[this.state.currentPageIndex]}
            />
          ) : null}
          {this.state.numberOfPages > 1 ? (
            <p>
              {this.state.currentPageIndex + 1} of {this.state.numberOfPages}{" "}
              pages
            </p>
          ) : null}
          {this.state.currentPageIndex > 0 ? (
            <PageButton data-cy="prevPage" onClick={this.prevPage}>
              Previous
            </PageButton>
          ) : null}
          {this.state.currentPageIndex < this.state.numberOfPages - 1 ? (
            <PageButton data-cy="nextPage" onClick={this.nextPage}>
              Next
            </PageButton>
          ) : null}
        </div>
      );
    }
  }
  WithPages.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    maxItemsPerPage: PropTypes.number
  };

  WithPages.defaultProps = {
    items: [{}],
    maxItemsPerPage: 10
  };
  return WithPages;
};

export default withPages;
```

```js
// src/client/components/CardGrid.js

import React from "react";
import PropTypes from "prop-types";

import Card from "./Card";
import withPages from "./withPages";

const CardGrid = props => (
  <div data-cy="CardGrid">
    {props.items !== null
      ? props.items.map(album => <Card {...album} key={album._id} />)
      : null}
  </div>
);

CardGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
};

CardGrid.defaultProps = {
  items: [{}]
};

export default withPages(CardGrid);
```

Now, when we use the `CardGrid` album, we also want to pass down a value for the `maxItemsPerPage` prop, otherwise it will default to 10.

```js
// src/client/App.js

import React from "react";
import { loadAlbums } from "./lib/service";
import CardGrid from "./components/CardGrid";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: null
    };
  }

  componentDidMount() {
    loadAlbums().then(({ data }) => {
      this.setState({ albums: data });
    });
  }
  render() {
    return (
      <div>
        {this.state.albums !== null ? (
          <CardGrid items={this.state.albums} maxItemsPerPage={5} />
        ) : null}
      </div>
    );
  }
}
```

### Sort

So far we haven't written any additional `Jest/Enzyme` tests and we haven't touched our `Redux` store. The `filter`, `sort`, and `search` feature set will present a good opportunity for this.

When we touch one of these features, we want to be able to pass a different, modified array to the `CardGrid` component. But we also want to hold on to our current state of `albums` so that we don't have to pointlessly re-request it from the server. Therefore, we should save the response from our initial request in the `Redux` store. We can then either copy and modify that array when we want to filter, sort, or search. Or if we have many users and many items, we can handle this server-side with `Mongo` operators. For now, we'll try to keep things as close to the feature-level as possible.

* Create base `albumsReducer`

```js
// src/client/reducers/albumsReducer.js

const initialState = {
  albums: null
};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default albumsReducer;
```

* Modify `reducers/index.js` to return combined reducers

```js
// src/client/reducers/index.js

import { combineReducers } from "redux";
import albumsReducer from "./albumsReducer";

export default combineReducers({ albums: albumsReducer });
```

* Touch `src/client/lib/constants.js`

```js
// src/client/lib/constants.js

export const FETCH_ALBUMS_SUCCESS = "FETCH_ALBUMS_SUCCESS";
export const FETCH_ALBUMS_FAILURE = "FETCH_ALBUMS_FAILURE";
```

* Touch `src/client/actions/index.js`
* Move `loadAlbums` request into `fetchAlbums` action

```js
// src/client/actions/index.js

import { FETCH_ALBUMS_SUCCESS, FETCH_ALBUMS_FAILURE } from "../lib/constants";
import { loadAlbums } from "../lib/service";

const fetchAlbumsFailure = error => ({
  type: FETCH_ALBUMS_FAILURE,
  error
});

const fetchAlbumsSuccess = albums => ({
  type: FETCH_ALBUMS_SUCCESS,
  albums
});

export const fetchAlbums = () => dispatch => {
  loadAlbums()
    .then(({ data }) => dispatch(fetchAlbumsSuccess(data)))
    .catch(error => dispatch(fetchAlbumsFailure(error)));
};
```

* Add cases to `albumsReducer`

```js
// src/client/reducers/albumsReducer.js

import { FETCH_ALBUMS_FAILURE, FETCH_ALBUMS_SUCCESS } from "../lib/constants";

const initialState = {
  albums: null,
  error: null
};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALBUMS_FAILURE: {
      return { ...state, error: action.error };
    }
    case FETCH_ALBUMS_SUCCESS: {
      return { ...state, albums: action.albums };
    }
    default:
      return state;
  }
};

export default albumsReducer;
```

* Now, let's bring in both the state and the async function to our root component to use instead of local state

```js
// src/client/App.js

import React from "react";
import { connect } from "react-redux";

import { fetchAlbums } from "./actions";
import CardGrid from "./components/CardGrid";

class App extends React.Component {
  componentDidMount() {
    this.props.loadAlbums();
  }
  render() {
    return (
      <div>
        {this.props.albums !== null ? (
          <CardGrid items={this.props.albums} maxItemsPerPage={5} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  albums: state.albums.albums
});
const mapDispatchToProps = dispatch => ({
  loadAlbums: () => dispatch(fetchAlbums())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

* The albums are now safely stored in the `Redux` store. If we want to swap out the data that we pass to `CardGrid` and then quickly revert to the original data without fetching it from the server again, no problem.

```js
// src/client/lib/constants.js

//... other consts
export const SORT_BY_TITLE_ASC = "SORT_BY_TITLE_ASC";
export const SORT_BY_TITLE_DESC = "SORT_BY_TITLE_DESC";
export const SORT_BY_RATING_ASC = "SORT_BY_RATING_ASC";
export const SORT_BY_RATING_DESC = "SORT_BY_RATING_DESC";
```

* Create the actions

```js
// src/client/actions/index.js

import {
  SORT_BY_RATING_ASC,
  SORT_BY_RATING_DESC,
  SORT_BY_TITLE_ASC,
  SORT_BY_TITLE_DESC
} from "../lib/constants";

// ...other imports, other actions

export const sortByTitleAsc = () => ({ type: SORT_BY_TITLE_ASC });
export const sortByTitleDesc = () => ({ type: SORT_BY_TITLE_DESC });
export const sortByRatingAsc = () => ({ type: SORT_BY_RATING_ASC });
export const sortByRatingDesc = () => ({ type: SORT_BY_RATING_DESC });
```

* Touch `src/client/__tests__/reducers/albumsReducer.test.js`

```js
// src/client/__tests__/reducers/albumsReducer.test.js

import albumsReducer from "../../reducers/albumsReducer";
import * as constants from "../../lib/constants";
import sampleData from "../../../server/sampledata.json";

describe("albumsReducer", () => {
  let loadedState;
  beforeEach(() => {
    loadedState = albumsReducer(undefined, {
      type: constants.FETCH_ALBUMS_SUCCESS,
      albums: sampleData
    });
  });
  it("loads the albums from the server", () => {
    expect(loadedState.albums.length).toBe(sampleData.length);
  });
  it("should sort the albums by title in ascending order", () => {
    const sortedByTitleAsc = sampleData.sort((a, b) => a.title - b.title);
    const sortedState = albumsReducer(loadedState, {
      type: constants.SORT_BY_TITLE_ASC
    });
    expect(sortedState.albums).toMatchObject(sortedByTitleAsc);
  });

  it("should sort the albums by title in descending order", () => {
    const sortedByTitleDesc = sampleData.sort((a, b) => {
      if (a.title > b.title) return -1;
      else if (a.title < b.title) return 1;
      return 0;
    });
    const sortedState = albumsReducer(loadedState, {
      type: constants.SORT_BY_TITLE_DESC
    });
    expect(sortedState.albums).toMatchObject(sortedByTitleDesc);
  });

  it("should sort the albums by rating in ascending order", () => {
    const sortedState = albumsReducer(loadedState, {
      type: constants.SORT_BY_RATING_ASC
    });
    const firstItem = sortedState.albums[0].rating;
    const lastItem = sortedState.albums[sortedState.albums.length - 1].rating;
    expect(lastItem).toBeGreaterThanOrEqual(firstItem);
  });

  it("should sort the albums by rating in descending order", () => {
    const sortedState = albumsReducer(loadedState, {
      type: constants.SORT_BY_RATING_DESC
    });
    const firstItem = sortedState.albums[0].rating;
    const lastItem = sortedState.albums[sortedState.albums.length - 1].rating;
    expect(firstItem).toBeGreaterThanOrEqual(lastItem);
  });
});
```

* Update the reducer

```js
// src/client/reducers/albumsReducer.js

import {
  FETCH_ALBUMS_FAILURE,
  FETCH_ALBUMS_SUCCESS,
  SORT_BY_RATING_ASC,
  SORT_BY_RATING_DESC,
  SORT_BY_TITLE_ASC,
  SORT_BY_TITLE_DESC
} from "../lib/constants";

const initialState = {
  albums: null,
  error: null,
  sortOrder: ""
};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALBUMS_FAILURE: {
      return { ...state, error: action.error };
    }
    case FETCH_ALBUMS_SUCCESS: {
      return {
        ...state,
        albums: action.albums.sort((a, b) => {
          if (a.title > b.title) return 1;
          else if (a.title < b.title) return -1;
          return 0;
        }),
        sortOrder: SORT_BY_TITLE_ASC
      };
    }
    case SORT_BY_TITLE_ASC: {
      return {
        ...state,
        albums: state.albums.slice().sort((a, b) => {
          if (a.title > b.title) return 1;
          else if (a.title < b.title) return -1;
          return 0;
        }),
        sortOrder: SORT_BY_TITLE_ASC
      };
    }

    case SORT_BY_TITLE_DESC: {
      return {
        ...state,
        albums: state.albums.slice().sort((a, b) => {
          if (a.title > b.title) return -1;
          else if (a.title < b.title) return 1;
          return 0;
        }),
        sortOrder: SORT_BY_TITLE_DESC
      };
    }

    case SORT_BY_RATING_ASC: {
      return {
        ...state,
        albums: state.albums.slice().sort((a, b) => a.rating - b.rating),
        sortOrder: SORT_BY_RATING_ASC
      };
    }
    case SORT_BY_RATING_DESC: {
      return {
        ...state,
        albums: state.albums.slice().sort((a, b) => b.rating - a.rating),
        sortOrder: SORT_BY_RATING_DESC
      };
    }

    default:
      return state;
  }
};

export default albumsReducer;
```

#### Refactor and Connect

* Extract the withPages HOC logic to a separate file `src/client/hocs/withPages.js`

TODO: Discuss the new `static getDerivedStateFromProps` method

```js
// src/client/hocs/withPages.js

import React from "react";
import PropTypes from "prop-types";
import { chunk } from "lodash";
import styled from "styled-components";

const PageButton = styled.button``;

const withPages = WrappedComponent => {
  class WithPages extends React.Component {
    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.items !== prevState.items) {
        const paginate = items => chunk(items, prevState.maxItemsPerPage);
        const pages = paginate(nextProps.items);
        const numberOfPages = pages.length;
        return {
          ...prevState,
          pages,
          numberOfPages,
          currentPageIndex: 0
        };
      }
      return null;
    }
    constructor(props) {
      super(props);
      this.state = {
        maxItemsPerPage: props.maxItemsPerPage,
        pages: null,
        numberOfPages: 1,
        currentPageIndex: 0
      };
      this.pages = this.pages.bind(this);
      this.nextPage = this.nextPage.bind(this);
      this.prevPage = this.prevPage.bind(this);
    }

    pages(items) {
      return chunk(items, this.state.maxItemsPerPage);
    }
    nextPage() {
      this.setState(prevState => {
        const nextPageIndex = prevState.currentPageIndex + 1;
        return { currentPageIndex: nextPageIndex };
      });
    }

    prevPage() {
      this.setState(prevState => {
        const prevPageIndex = prevState.currentPageIndex - 1;
        return { currentPageIndex: prevPageIndex };
      });
    }

    render() {
      return (
        <div>
          {this.state.pages !== null ? (
            <WrappedComponent
              {...this.props}
              items={this.state.pages[this.state.currentPageIndex]}
            />
          ) : null}
          {this.state.numberOfPages > 1 ? (
            <p>
              {this.state.currentPageIndex + 1} of {this.state.numberOfPages}{" "}
              pages
            </p>
          ) : null}
          {this.state.currentPageIndex > 0 ? (
            <PageButton data-cy="prevPage" onClick={this.prevPage}>
              Previous
            </PageButton>
          ) : null}
          {this.state.currentPageIndex < this.state.numberOfPages - 1 ? (
            <PageButton data-cy="nextPage" onClick={this.nextPage}>
              Next
            </PageButton>
          ) : null}
        </div>
      );
    }
  }
  WithPages.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    maxItemsPerPage: PropTypes.number
  };

  WithPages.defaultProps = {
    items: [{}],
    maxItemsPerPage: 10
  };
  return WithPages;
};

export default withPages;
```

* Create a special container for the CardGrid component called `src/client/containers/AlbumGrid.js`

```js
// src/client/containers/AlbumGrid.js

import React from "react";

import withAlbums from "../hocs/withAlbums";
import CardGrid from "../components/CardGrid";

export const AlbumGrid = props => (
  <div>
    <div>
      <button onClick={props.onSortByRatingAsc}>Sort By Rating (asc)</button>
      <button onClick={props.onSortByRatingDesc}>Sort By Rating (desc)</button>
      <button onClick={props.onSortByTitleAsc}>Sort By Title (asc)</button>
      <button onClick={props.onSortByTitleDesc}>Sort By Title (desc)</button>
      <p>{props.sortOrder}</p>
    </div>

    {props.albums ? (
      <CardGrid items={props.albums} maxItemsPerPage={5} />
    ) : null}
  </div>
);

export default withAlbums(AlbumGrid);
```

* Create a higher order component that connects this container with the redux store

```js
// src/client/hocs/withAlbums.js

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  fetchAlbums,
  sortByRatingAsc,
  sortByRatingDesc,
  sortByTitleAsc,
  sortByTitleDesc
} from "../actions";

const withAlbums = WrappedComponent => {
  class WithAlbums extends React.Component {
    componentDidMount() {
      this.props.loadAlbums();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  WithAlbums.propTypes = {
    loadAlbums: PropTypes.func.isRequired
  };
  const mapStateToProps = state => ({
    albums: state.albums.albums,
    sortOrder: state.albums.sortOrder
  });
  const mapDispatchToProps = dispatch => ({
    loadAlbums: () => dispatch(fetchAlbums()),
    onSortByRatingAsc: () => dispatch(sortByRatingAsc()),
    onSortByRatingDesc: () => dispatch(sortByRatingDesc()),
    onSortByTitleAsc: () => dispatch(sortByTitleAsc()),
    onSortByTitleDesc: () => dispatch(sortByTitleDesc())
  });
  return connect(mapStateToProps, mapDispatchToProps)(WithAlbums);
};

export default withAlbums;
```

* The `CardGrid` component can now be significantly paired down. Here's the updated test followed by the component:

```js
// src/client/__tests__/components/Card.test.js

import React from "react";
import { shallow } from "enzyme";

import Card from "../../components/Card";
import sampleData from "../../../server/sampledata.json";

describe("Card", () => {
  it("renders", () => {
    const wrapper = shallow(<Card />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a card title by default", () => {
    const wrapper = shallow(<Card />);
    expect(wrapper.find("h3").text()).toBeTruthy();
  });

  it("should render the title of the provided item", () => {
    const sampleItem = sampleData[0];
    const wrapper = shallow(<Card {...sampleItem} />);
    expect(wrapper.find('[data-cy="card__title"]').text()).toContain(
      sampleItem.title
    );
  });
});
```

```js
// src/client/components/CardGrid.js

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Card from "./Card";
import withPages from "../hocs/withPages";

const CardGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CardGrid = props => (
  <CardGridWrapper data-cy="CardGrid">
    {props.items.map(album => <Card {...album} key={album._id} />)}
  </CardGridWrapper>
);

CardGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
};

CardGrid.defaultProps = {
  items: [{}]
};

export default withPages(CardGrid);
```

The `App` component can be converted to a stateless functional component for the time being:

```js
// src/client/App.js

import React from "react";

import AlbumGrid from "./containers/AlbumGrid";

const App = () => <AlbumGrid />;

export default App;
```

The project structure should now look like this:

```txt
├── README.md
├── cypress
│   ├── fixtures
│   │   └── albums.json
│   ├── integration
│   │   └── app-init.spec.js
│   ├── plugins
│   │   └── index.js
│   ├── screenshots
│   │   └── my-image.png
│   └── support
│       ├── commands.js
│       └── index.js
├── cypress.json
├── index.html
├── nodemon.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── setupTests.js
├── src
│   ├── client
│   │   ├── App.js
│   │   ├── __tests__
│   │   │   ├── components
│   │   │   ├── containers
│   │   │   └── reducers
│   │   ├── actions
│   │   │   └── index.js
│   │   ├── components
│   │   │   ├── Card.js
│   │   │   └── CardGrid.js
│   │   ├── containers
│   │   │   ├── AlbumGrid.js
│   │   ├── hocs
│   │   │   ├── withAlbums.js
│   │   │   └── withPages.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── lib
│   │   │   ├── constants.js
│   │   │   └── service.js
│   │   ├── reducers
│   │   │   ├── albumsReducer.js
│   │   │   └── index.js
│   │   └── store
│   │       └── index.js
│   └── server
│       ├── database
│       │   └── index.js
│       ├── index.js
│       ├── models
│       │   └── index.js
│       ├── routes
│       │   ├── index.js
│       │   └── index.test.js
│       └── sampledata.json
├── stories
│   └── index.stories.js
├── webpack.config.js
└── yarn.lock
```

### Search

Again, there are better ways to approach search in terms of scalability, but for this stage of the project, we're going to implement a quick and dirty client-side search using the `filter` array method.

* Write a reducer new test in `src/client/__tests__/reducers/albumsReducer.test.js`

```js
// src/client/__tests__/reducers/albumsReducer.test.js

import albumsReducer from "../../reducers/albumsReducer";
import * as constants from "../../lib/constants";
import sampleData from "../../../server/sampledata.json";

describe("albumsReducer", () => {
  let loadedState;
  beforeEach(() => {
    loadedState = albumsReducer(undefined, {
      type: constants.FETCH_ALBUMS_SUCCESS,
      albums: sampleData
    });
  });

  // ...other tests

  it("should filter artists by artist and title", () => {
    const query = "space";
    const filteredState = albumsReducer(loadedState, {
      type: constants.FILTER_BY_SEARCH_QUERY,
      query
    });
    const expected = sampleData.filter(album => {
      const re = new RegExp(query, "gi");
      return album.title.match(re) || album.artist.match(re);
    });

    expect(filteredState.filteredAlbums).toMatchObject(expected);
  });
});
```

* Add `FILTER_BY_SEARCH_QUERY` to `src/client/lib/constants.js`
* Create the `filterBySearchQuery` action

```js
// src/client/actions/index.js

import {
  // ...other constants
  FILTER_BY_SEARCH_QUERY
} from "../lib/constants";
import { loadAlbums } from "../lib/service";

// ...other actions

export const filterBySearchQuery = query => ({
  type: FILTER_BY_SEARCH_QUERY,
  query
});
```

* Create the reducer case for `FILTER_BY_SEARCH_QUERY`

We will need to manage a new piece of state in our store `filteredAlbums`; we might also need a flag `searchActive` because our components will need to know whether to use `albums` or `filteredAlbums` in the `CardGrid` display. So, we'll also set `searchActive` to false in every other case.

```js
// src/client/reducers/albumsReducer.js

import {
  FETCH_ALBUMS_FAILURE,
  FETCH_ALBUMS_SUCCESS,
  SORT_BY_RATING_ASC,
  SORT_BY_RATING_DESC,
  SORT_BY_TITLE_ASC,
  SORT_BY_TITLE_DESC,
  FILTER_BY_SEARCH_QUERY
} from "../lib/constants";

const initialState = {
  albums: null,
  filteredAlbums: null,
  error: null,
  sortOrder: "",
  searchActive: false
};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALBUMS_FAILURE: {
      return { ...state, error: action.error };
    }

    case FETCH_ALBUMS_SUCCESS: {
      return {
        ...state,
        albums: action.albums.sort((a, b) => {
          if (a.title > b.title) return 1;
          else if (a.title < b.title) return -1;
          return 0;
        }),
        sortOrder: SORT_BY_TITLE_ASC,
        searchActive: false
      };
    }

    case FILTER_BY_SEARCH_QUERY: {
      const filteredAlbums = state.albums.slice().filter(album => {
        const re = new RegExp(action.query, "gi");
        return album.title.match(re) || album.artist.match(re);
      });
      return { ...state, searchActive: true, filteredAlbums };
    }

    case SORT_BY_TITLE_ASC: {
      return {
        ...state,
        albums: state.albums.slice().sort((a, b) => {
          if (a.title > b.title) return 1;
          else if (a.title < b.title) return -1;
          return 0;
        }),
        sortOrder: SORT_BY_TITLE_ASC,
        searchActive: false
      };
    }

    case SORT_BY_TITLE_DESC: {
      return {
        ...state,
        albums: state.albums.slice().sort((a, b) => {
          if (a.title > b.title) return -1;
          else if (a.title < b.title) return 1;
          return 0;
        }),
        sortOrder: SORT_BY_TITLE_DESC,
        searchActive: false
      };
    }

    case SORT_BY_RATING_ASC: {
      return {
        ...state,
        albums: state.albums.slice().sort((a, b) => a.rating - b.rating),
        sortOrder: SORT_BY_RATING_ASC,
        searchActive: false
      };
    }
    case SORT_BY_RATING_DESC: {
      return {
        ...state,
        albums: state.albums.slice().sort((a, b) => b.rating - a.rating),
        sortOrder: SORT_BY_RATING_DESC,
        searchActive: false
      };
    }

    default:
      return state;
  }
};

export default albumsReducer;
```

The test should now be passing.

* Import the `filterBySearchQuery` action into `src/client/hocs/withAlbums.js`, our connected HOC
* Map `filteredAlbums` and `searchActive` to state
* Map dispatch to `filterBySearchQuery`

```js
> // src/client/hocs/withAlbums.js

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchAlbums,
  sortByRatingAsc,
  sortByRatingDesc,
  sortByTitleAsc,
  sortByTitleDesc,
  filterBySearchQuery
} from '../actions';

const withAlbums = (WrappedComponent) => {
  class WithAlbums extends React.Component {
    componentDidMount() {
      this.props.loadAlbums();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  WithAlbums.propTypes = {
    loadAlbums: PropTypes.func.isRequired
  };
  const mapStateToProps = state => ({
    albums: state.albums.albums,
    filteredAlbums: state.albums.filteredAlbums,
    searchActive: state.albums.searchActive,
    sortOrder: state.albums.sortOrder
  });
  const mapDispatchToActions = dispatch => ({
    loadAlbums: () => dispatch(fetchAlbums()),
    onFilterBySearchQuery: query => dispatch(filterBySearchQuery(query)),
    onSortByRatingAsc: () => dispatch(sortByRatingAsc()),
    onSortByRatingDesc: () => dispatch(sortByRatingDesc()),
    onSortByTitleAsc: () => dispatch(sortByTitleAsc()),
    onSortByTitleDesc: () => dispatch(sortByTitleDesc())
  });
  return connect(mapStateToProps, mapDispatchToActions)(WithAlbums);
};

export default withAlbums;
```

* Write a feature test that ensures that `filteredAlbums` is used as the data source if `searchActive`

```js
// cypress/integration/app-init.spec.js

describe("App intitialization", () => {
  beforeEach(() => {
    cy.server();
    cy.route("GET", "/api/albums", "fixture:albums");
    cy.visit("/");
  });

  // ...other tests

  it("should display only the search results when the user enters text into the search field", () => {
    const query = "space";
    cy.get("input[data-cy=searchAlbums]").type(query);
    cy.get("[data-cy=Card]").should("have.lengthOf", 1);
  });
});
```

* Create a text input for users to enter their queries and switch out the data with `filteredAlbums` if \`searchActive

```js
// src/client/containers/AlbumGrid.js

import React from "react";

import withAlbums from "../hocs/withAlbums";
import CardGrid from "../components/CardGrid";

export const AlbumGrid = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    this.search = this.search.bind(this);
  }

  search(event) {
    this.setState({ query: event.target.value });
    this.props.onFilterBySearchQuery(this.state.query);
  }
  render() {
    const { props } = this;
    let items;
    if (props.searchActive && this.state.query) {
      items = props.filteredAlbums;
    } else {
      items = props.albums;
    }
    return (
      <div>
        <div>
          <input
            type="text"
            data-cy="searchAlbums"
            onChange={this.search}
            value={this.state.query}
          />
          <button onClick={props.onSortByRatingAsc}>
            Sort By Rating (asc)
          </button>
          <button onClick={props.onSortByRatingDesc}>
            Sort By Rating (desc)
          </button>
          <button onClick={props.onSortByTitleAsc}>Sort By Title (asc)</button>
          <button onClick={props.onSortByTitleDesc}>
            Sort By Title (desc)
          </button>
          <p>{props.sortOrder}</p>
        </div>

        {props.albums ? <CardGrid items={items} maxItemsPerPage={5} /> : null}
      </div>
    );
  }
};

export default withAlbums(AlbumGrid);
```

There is at least one bug. Right now, if nothing matches the query, we're seeing fake album created by `defaultProps` in the `CardGrid` and `Card` components. Another bug is that the search seems to be lagging a key or two behind. This is because `setState` is asynchronous, which means we're dispatching the `filterBySearchQuery` with a state value before that state value has been updated.

We just need to make a couple of adjustments to our `CardGrid` component.

* Remove the empty object in the `defaultProps` array value for `items`
* If `items` is empty, display a message to the user.

```js
// src/client/__tests__/components/CardGrid.test.js

// ...imports

describe("CardGrid", () => {
  // ...other tests

  it("displays a message to the user if `items` is empty", () => {
    const emptyMessage = "No items.";
    const wrapper = shallow(<CardGrid items={[]} />);
    expect(wrapper.find("p").text()).toContain(emptyMessage);
  });
});
```

```js
// src/client/components/CardGrid.js

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { isEmpty } from "lodash";

import Card from "./Card";
import withPages from "../hocs/withPages";

const CardGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CardGrid = props => (
  <CardGridWrapper data-cy="CardGrid">
    {!isEmpty(props.items) ? (
      props.items.map(album => <Card {...album} key={album._id} />)
    ) : (
      <p>No items.</p>
    )}
  </CardGridWrapper>
);

CardGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
};

CardGrid.defaultProps = {
  items: []
};

export default withPages(CardGrid);
```

Luckily, `setState` also takes a callback. So, we can move the call to dispatch there.

```js
// src/client/containers/AlbumGrid.js

// ...other component code

  search(event) {
    this.setState({ query: event.target.value }, () =>
      this.props.onFilterBySearchQuery(this.state.query));
  }

// ...other component code
```

#### Refactor and Style

* Move the search and sort controls into their own component `src/client/containers/SearchSortControls.js`

The updated `AlbumGrid` component will look like this

```js
// src/client/containers/AlbumGrid.js

import React from "react";

import withAlbums from "../hocs/withAlbums";
import CardGrid from "../components/CardGrid";
import SearchSortControls from "../containers/SearchSortControls";

export const AlbumGrid = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    this.search = this.search.bind(this);
  }

  search(event) {
    this.setState({ query: event.target.value }, () =>
      this.props.onFilterBySearchQuery(this.state.query)
    );
  }
  render() {
    const { props } = this;
    let items;
    if (props.searchActive && this.state.query) {
      items = props.filteredAlbums;
    } else {
      items = props.albums;
    }
    return (
      <div>
        <SearchSortControls
          search={this.search}
          searchActive={props.searchActive}
          query={this.state.query}
          onSortByRatingAsc={props.onSortByRatingAsc}
          onSortByRatingDesc={props.onSortByRatingDesc}
          onSortByTitleAsc={props.onSortByTitleAsc}
          onSortByTitleDesc={props.onSortByTitleDesc}
          sortOrder={props.sortOrder}
        />
        {props.albums ? <CardGrid items={items} maxItemsPerPage={5} /> : null}
      </div>
    );
  }
};

export default withAlbums(AlbumGrid);
```

* Create styled-components for the buttons and search field in `src/client/containers/SearchSortControls.js`

```js
// src/client/containers/SearchSortControls.js

import React from "react";
import styled from "styled-components";

const SearchSortControlsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 310px;
  margin: 1em auto;
  justify-content: center;
  align-items: center;
  background: #c4c4c4;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  height: 3em;
`;

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  border: transparent;
`;

const SearchInput = styled.input`
  font-size: 1.5em;
  width: ${props => (props.active ? "100%" : "0")};
  padding: ${props => (props.active ? "0.5em" : "0")};
  flex: ${props => (props.active ? "3 0 50%" : "0")};
  margin: 0;
  border: none;
  transition: all 0.5s ease-in-out;
`;

const SearchSortControls = class extends React.Component {
  constructor(props) {
    super(props);
    this.searchInput = null;
    this.searchButton = null;
    this.searchButtonHandler = this.searchButtonHandler.bind(this);
  }

  searchButtonHandler() {
    this.props.onToggleSearchActive();
    if (this.props.searchActive) {
      this.searchButton.focus();
    } else {
      this.searchInput.focus();
    }
  }

  render() {
    const { props } = this;

    return (
      <SearchSortControlsWrapper>
        <SearchInput
          type="text"
          data-cy="searchAlbums"
          onChange={props.search}
          value={props.query}
          active={props.searchActive}
          innerRef={el => {
            this.searchInput = el;
          }}
        />
        <Button
          data-cy="searchButton"
          onClick={this.searchButtonHandler}
          innerRef={el => {
            this.searchButton = el;
          }}
        >
          Search
        </Button>
        <Button onClick={props.onSortByRatingAsc}>Sort By Rating (asc)</Button>
        <Button onClick={props.onSortByRatingDesc}>
          Sort By Rating (desc)
        </Button>
        <Button onClick={props.onSortByTitleAsc}>Sort By Title (asc)</Button>
        <Button onClick={props.onSortByTitleDesc}>Sort By Title (desc)</Button>
      </SearchSortControlsWrapper>
    );
  }
};

export default SearchSortControls;
```

* For this change, we had to go up the chain, adding the `onToggleSearchActive` prop, a new `toggleSearchActive` action, and `TOGGLE_SEARCH_ACTIVE` reducer

```js
// src/client/containers/AlbumGrid.js

<SearchSortControls
  // ....other props
  onToggleSearchActive={props.onToggleSearchActive}
/>;

// src/client/hocs/withAlbums.js

import { toggleSearchActive /** ...other actions **/ } from "../actions";

const mapStateToProps = state => ({
  // ...other mapped state
  searchActive: state.albums.searchActive
});

const mapDispatchToActions = dispatch => ({
  // ...other mapped actions
  onToggleSearchActive: () => dispatch(toggleSearchActive())
});

// src/client/lib/constants.js

// ...other constants
export const TOGGLE_SEARCH_ACTIVE = "TOGGLE_SEARCH_ACTIVE";

// src/client/actions/index.js

import {
  // ... other imports
  TOGGLE_SEARCH_ACTIVE
} from "../lib/constants";
import { loadAlbums } from "../lib/service";

// ...other actions

export const toggleSearchActive = () => ({ type: TOGGLE_SEARCH_ACTIVE });

// src/client/reducers/albumsReducer.js

import {
  // ...other constants
  TOGGLE_SEARCH_ACTIVE
} from "../lib/constants";

const initialState = {
  albums: null,
  filteredAlbums: null,
  error: null,
  sortOrder: "",
  searchActive: false
};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    // ...other reducer cases

    case TOGGLE_SEARCH_ACTIVE: {
      if (state.searchActive) {
        return { ...state, searchActive: false, filteredAlbums: null };
      }
      return { ...state, searchActive: true };
    }

    default:
      return state;
  }
};

export default albumsReducer;
```

This slight change in functionality, requiring the user to click the search button before they can enter text means that we need to update one `Cypress` test which is now failing.

* Add a command to click the search button before attempting to find and type in the search

```js
// cypress/integration/app-init.spec.js

// ...other tests

it("should display only the search results when the user enters text into the search field", () => {
  const query = "space";
  cy.get('button[data-cy="searchButton"]').click();
  cy.get("input[data-cy=searchAlbums]").type(query);
  cy.get("[data-cy=Card]").should("have.lengthOf", 1);
});
```

Another bug to consider is if the user enters special characters or attempt a XSS attack. We should always sanitize user input. Not to mention that currently, if you type `(` into the text input, it causes the regular expression used in the `FILTER_BY_SEARCH_QUERY` reducer case to throw an error and nothing renders on the page.

Basically, we just want to make sure that the following characters get escaped: `"^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", and "|"`. Since we're already using `lodash`, we can use the `.escapeRegExp` method to handle this, but first let's write a test.

```js
// src/client/__tests__/reducers/albumsReducer.test.js

import { escapeRegExp } from "lodash";
// ...other imports

describe("albumsReducer", () => {
  let loadedState;
  beforeEach(() => {
    loadedState = albumsReducer(undefined, {
      type: constants.FETCH_ALBUMS_SUCCESS,
      albums: sampleData
    });
  });

  // ...other tests

  it("should escape user input that includes special characters", () => {
    const query = "(space";
    const filteredState = albumsReducer(loadedState, {
      type: constants.FILTER_BY_SEARCH_QUERY,
      query
    });

    const escapedQuery = escapeRegExp(query);
    const expected = sampleData.filter(album => {
      const re = new RegExp(escapedQuery, "gi");
      return album.title.match(re) || album.artist.match(re);
    });
    expect(filteredState.filteredAlbums).toMatchObject(expected);
  });
});
```

Now, the question is where to escape? We could just escape in the reducer, but I'm going to err on the side of caution and also escape in component before `setState`. Though that will require an integration test to verify.

```js
// cypress/integration/app-init.spec.js

// ...other tests

it("should escape special characters the user types into the search field", () => {
  const query = "(space";
  cy.get('button[data-cy="searchButton"]').click();
  cy.get("input[data-cy=searchAlbums]").type(query);
  cy.get("[data-cy=Card]").should("have.lengthOf", 1);
});
```

Now, let's escape and sanitize that input in the `AlbumGrid` component before it gets set to state. We're going to let a couple special characters through (in case they're used in obscure album names).

```js
// src/client/containers/AlbumGrid.js

import {escapeRegExp} from 'lodash';
// ...other imports

// ...other component code

  search(event) {
    const sanitizeInput = e =>
      escapeRegExp(e)
        .match(/[A-Za-z0-9 _.,!"'/$]*/gi)
        .join('');
    const query = sanitizeInput(event.target.value);
    this.setState({ query }, () => this.props.onFilterBySearchQuery(this.state.query));
  }

// ...other component code
```

The integration test should pass, but let's get our reducer test in the green too.

```js
// src/client/reducers/albumsReducer.js

import { escapeRegExp } from 'lodash';

//... other imports
//... other reducer cases

    case FILTER_BY_SEARCH_QUERY: {
      const filteredAlbums = state.albums.slice().filter((album) => {
        const query = escapeRegExp(action.query);
        const re = new RegExp(query, 'gi');
        return album.title.match(re) || album.artist.match(re);
      });
      return { ...state, searchActive: true, filteredAlbums };
    }
```

## Auth Workflow

When a user visits the site, the app will check the browser's `localStorage` (or this can be handled server-side by checking cookies in the request) and if there is a stored value, attempt to authenticate on the user's behalf. Authentication will unlock certain routes and features.

If not authenticated, the user will only be able to browse the public collection of albums. They shouldn't see the edit or delete buttons. They will, however, see buttons to add a new album or to add an album to their collection. These actions will both redirect the user to a sign-in/sign-up page.

To be continued....

The project source code can be found here: <https://github.com/thephilgray/review-react-2018/tree/master/005_mern>.
