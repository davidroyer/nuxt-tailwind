# Nuxtent Guide

## New Features & Changes

The `.vue` page component responsible for rendering individual blog posts has changed to `_slug.vue` to follow the practices mentioned in Nuxt's documentation

Also, added projects page components

---

## Helpers

**_The `utilities` folder_**

* `utilities/filters`
* `utilities/helpers`

Inside utilities there is the function `slugifyText`. It is used both in another function, `getPostsFromTag`, but is also needed as a `vue-filter` when creating links for each tag.

---

## Generate

Set fallback to true for now

---

## Adding To Project

1. Create a tags folder with `_tag.vue` inside
2.

---

## Things To Do Still

* Be able to use sitemap module with nuxtent.

  * I believe good possible solution is to set false for nuxtent generate and do it manually.
  * Also, find example where someone is generating routes and also generating sitemap routes

*
