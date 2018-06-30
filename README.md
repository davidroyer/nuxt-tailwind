# Nuxt Website/App Starter

## ToDo

* [x] Get `.prettier` to work
* [ ] Check on async loading of some external components
* [ ] Choose whether going to use .postcss file or set it in `nuxt.config`

## Overview

**_Includes_**

* Fine Tuning for SEO by proper use of `hid` in meta tags
* Use of social media meta tags so each page can have its own metaDescription
* Focus on accessiblity
* Component Library
* PurgeCSS to remove unused css
* TailwindCSS
* Special config file to be the primary file that will need to be updated on a project by project basic
* `website.config.js`
* Use of `prettier`
* Google analytics via `@nuxtjs/google-analytics`
* PWA `@nuxtjs/pwa`
* Sitemap for SEO via `@nuxtjs/sitemap`

### Miscellaneous

`website.config.js` exists so much of the meta info that will need to be changed for each site is easily accessible.

This should allow for the contents of `nuxt.config.js` to remain more of a constant.

The `Array` of Navigation Links are stored in `store.js`

Nuxtent is still on the other branch

### Components

There are global components available that live at `components/global`
They are registered via `global.js` inside `plugins`

## Modules

* sitemap
* google analytics
* fontawesome

- Create JPEG image sized at ??? and add it to static folder
- Netlify form

> Nuxt.js Starter

## Build Setup

```bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
