<template>
  <div class="app-wrapper flex-1 z-10 bg-white">
    <AppHeader></AppHeader>
    <nuxt class="flex-1 z-10 bg-white"/>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";

import Typography from "typography";
import githubTheme from "typography-theme-github";

githubTheme.baseFontSize = "17px";
githubTheme.baseLineHeight = "1.666";

// const typography = new Typography({
//   baseFontSize: "17px",
//   baseLineHeight: 1.666
//   headerFontFamily: [
//     "Avenir Next",
//     "Helvetica Neue",
//     "Segoe UI",
//     "Helvetica",
//     "Arial",
//     "sans-serif"
//   ],
//   bodyFontFamily: ["Georgia", "serif"]
//   See below for the full list of options.
// });

const typography = new Typography(githubTheme);

typography.injectStyles();

export default {
  components: {
    AppHeader,
    AppFooter
  }
};
</script>
