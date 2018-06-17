---
title: StarNotes
lead: Building a Realtime App with APIs and User Authentication
abstract: Kanban app for your GitHub starred repos.
category: demo
image: https://dzwonsemrish7.cloudfront.net/items/230Z0x1J1R2202351k2U/Image%202018-06-08%20at%2012.23.34%20PM.png?v=d2a88ea4
tags: VueJS, Vuex, Vuetify, Axios, Firebase, Github API
---

##### Inspiration

I star a lot of repos on Github, but for various reasons. Sometimes they're relevant to a project that I'm currently working on. Other times, I just want to bookmark them for future exploration. My original idea was — what if I could just import all my starred repos to a KanBan board and then organize them there?

##### What It Does

StarNotes allows users to login with their GitHub, create KanBan boards and lists, fetch and create cards from their starred repos and add notes to them.

##### How I Built It

I started with the Vuetify Webpack starter. I created a simple layout with navigation and a demo board component that fetches starred repos from the GitHub API. I used the Firebase SDK to authenticate with GitHub and created a dashboard where users can manage their boards. I created a Vuex store based on the initial demo board but with some other properties for user-specific state, and actions and mutations to interact with it. I created board, list, and demo components based on the original demo. Finally, I used the Firebase SDK to sync with a database and update the Vuex store inside the promise resolve callbacks.

##### Challenges I Ran Into

Firebase makes authentication quite easy compared with implementing a Node solution, but it still takes a lot of planning and some troubleshooting.

For example, the method I used to check the user's auth status to persist their signin as they navigate from page to page doesn't return the same object as the initial signin method, so I couldn't count on always getting some very useful provider data unless I wanted to store that in my database (which I didn't).

##### What I learned

This was my third project using Vuetify, so there was still much to learn but I became a lot faster at using the API without referring to the docs as much.

I've also worked with Firebase in a few other projects, but I spent a lot of time with the docs and I'm now comfortable with all the common auth and database methods.

**Link**: [https://github.com/philgrayphilgray/vue-2018/tree/master/004_star-notes](https://github.com/philgrayphilgray/vue-2018/tree/master/004_star-notes)
