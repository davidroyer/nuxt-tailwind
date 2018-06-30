---
title: "Using Firebase Auth With Nuxt.js"
subtitle: Part 1
description: This article is an overview of using Nuxt.js with Firebase Authentication. Learn how to check for admin access in your routes and use Vuex with Nuxt.js and Firebase to keep everything manageable.
tags:
  - vue
  - nuxt
  - firebase
---

This article is an overview of using Nuxt.js with Firebase Authentication. In Part 2, I will provide a more detail explanation of the concepts used in this example.

<div class="flexContainer">
<a target="/\_blank" rel="noopener" href=https://nuxt-firebase-auth.firebaseapp.com/>Live Demo</a>
<a target="/\_blank" rel="noopener" href=https://github.com/davidroyer/nuxt-firebase-auth>Github Repo</a>
</div>

**_Notes:_**

* I am using SPA mode with Nuxt.js which is implemented by setting the option `mode: 'spa'` in `nuxt.config.js`.

* You need to enable the Sign-In Method for Google from the Authentication settings via your Firebase Console.

* I am using Firebase Hosting but it should work with any static hosting provider. However, you'll need to authorize that domain via your Firebase Console in Authentication settings via your Firebase Console under the Sign-In Methods Tab.

I have created 3 files that handle the issues faced when attempting to use Firebase Auth with Nuxt.js.

* `fireinit.js`

* `fireauth.js`

* `router-auth.js`

---

## Firebase App Setup

To setup/initialize the firebase app with credentials, I created `services/fireinit.js`. An issue commonly seen by developers is Firebase telling us an app already exist. The line below solves this issue.

`!firebase.apps.length ? firebase.initializeApp(config) : ''`

This is an `if/else` statement in shortened form. It checks if any firebase apps already exist.

If one does not exist, initialize the app, otherwise do nothing because it's already happened so we're good to go.

```js
// This is `services/fireinit.js`

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

var config = {
  apiKey: "yourProjectValueHere",
  authDomain: "yourProjectValueHere",
  databaseURL: "yourProjectValueHere",
  projectId: "yourProjectValueHere",
  storageBucket: "yourProjectValueHere",
  messagingSenderId: "yourProjectValueHere"
};

!firebase.apps.length ? firebase.initializeApp(config) : "";
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const DB = firebase.database();
export const StoreDB = firebase.firestore();
export default firebase;
```

---

## Handling User Authentication State

Firebase provides `onAuthStateChanged` to handle user state. I created `fireauth.js` to setup this functionality

```js
// This is `@plugins/fireauth.js`

import { auth } from "@/services/fireinit.js";

export default context => {
  const { store } = context;

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        return resolve(store.commit("setUser", user));
      }
      return resolve();
    });
  });
};
```

---

## Protecting Authenticated Routes

**Scenario 1:**
A user is already signed-in and the next route is `/login`

_Redirect to `/admin`_

**Scenario 2:**
There is not a user signed-in and the next route is `/admin` or a sub-route such as, `/admin/settings`

_Redirect to `/login`_

This functions checks for the 2 scenarios:

```js
// This is `@middleware/router-auth.js`

export default function({ store, redirect, route }) {
  store.state.user != null && route.name == "login" ? redirect("/admin") : "";
  store.state.user == null && isAdminRoute(route) ? redirect("/login") : "";
}

function isAdminRoute(route) {
  if (route.matched.some(record => record.path == "/admin")) {
    return true;
  }
}
```

We will tell Nuxt.js to use this file by declaring it in `nuxt.config.js` as follows:

```js
router: {
  middleware: "router-auth";
}
```

With all of this in place, we are able to use Firebase Authentication with Nuxt.js to protect the `/admin` route as well as child routes such as `/admin/settings`.
