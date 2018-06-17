---
title: Album Collector
lead: Approaches in Full-Stack App Development with React and VueJS
abstract: An app for posting and sharing reviews of your favorite albums.
category: demo
image: https://dzwonsemrish7.cloudfront.net/items/1T2b2G1b0x3y0x3o3Y3X/Image%202018-06-08%20at%208.14.28%20PM.png?v=3335965c
tags: Node, React, VueJS, Redux, Vuex, Storybook, Axios, Styled Components, SASS, SVG, MongoDB, Prisma, GraphQL, FireBase, Serverless
---

##### Inspiration

I just wanted to make a simple CRUD app to get some experience working with React and VueJS in a full-stack project. I love music and listening to albums all the way through, so this was just another way of playing with them.

##### What It Does?

The final version allows you to browse albums reviews that other users have shared and login to write, share, and manage your own reviews. It has a Node/Express/Mongo backend and Vue and React frontends.

##### How I Built It

I started by building simple Redux/Vuex versions with Create React App and Vue-Cli. Initially, there was no backend — I focused on building out the components from scratch. I got comfortable with tools like Storybook and using Jest, Enzyme, and Cypress for unit and integration testing. In the second phase, I hooked the front-end up to JSON Rest API, a flat-file JSON server with built-in CRUD endpoints. Overall, the VueJS version was a little bit easier to implement, so I decided to focus on React.

In the meantime, I also worked on a couple different backend solutions, one with Express and Mongo, and the other with Prisma. After building a simple API with Prisma, and enjoying the ease of it, I decided to get some more experience with Express and Mongo and chose that route. I wrote the API in a test-driven way, writing assertion tests with Mocha and then later Jest before writing code.

After building some parts of the application on both the front and back ends, I attempted a full-stack test-driven version. I started by writing a custom Webpack config file and setting up linting and various testing tools and workflows. After the initial setup, I followed an outside-in approach, developing basic features first and then moving down the stack to the server level and then further down to the database, attempting to spend more time coding the former and more time testing the latter.

**Link**: [https://github.com/philgrayphilgray/api-design-2018/tree/master/001_express_mongo](https://github.com/philgrayphilgray/api-design-2018/tree/master/001_express_mongo)

**Link**: [https://github.com/philgrayphilgray/api-design-2018/tree/master/003_album-collector-api](https://github.com/philgrayphilgray/api-design-2018/tree/master/003_album-collector-api)

**Link**: [https://github.com/philgrayphilgray/vue-2018/tree/master/001_album-collector](https://github.com/philgrayphilgray/vue-2018/tree/master/001_album-collector)

**Link**: [https://000album-collector-syizwlkeyw.now.sh/](https://000album-collector-syizwlkeyw.now.sh/)

**Link**: [https://github.com/philgrayphilgray/review-react-2018/tree/master/002_styled-components](https://github.com/philgrayphilgray/review-react-2018/tree/master/002_styled-components)

**Link**: [https://github.com/philgrayphilgray/review-react-2018/tree/master/004_redux-axios](https://github.com/philgrayphilgray/review-react-2018/tree/master/004_redux-axios)

**Link**: [https://004redux-axios-bbwmsdwjot.now.sh/](https://004redux-axios-bbwmsdwjot.now.sh/)

**Link**: [https://github.com/philgrayphilgray/review-react-2018/tree/master/005_mern](https://github.com/philgrayphilgray/review-react-2018/tree/master/005_mern)
