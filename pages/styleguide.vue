<template>
    <main-wrapper>
        <IntroBlock :tag="1" text="Our Styleguides">Wooooo, here are the styleguides</IntroBlock>
        <hr>
    </main-wrapper>
</template>

<script>
import MainWrapper from "~/components/Layout/MainWrapper";
import IntroBlock from "~/components/Layout/IntroBlock";

// const tailwindConfig = require("~/tailwind.js");

export default {
  components: {
    MainWrapper,
    IntroBlock
  },
  data() {
    return {
      // tailwindConfig
    };
  }
};
</script>
