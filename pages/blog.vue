<template>
    <main-wrapper>
        <IntroBlock :tag="1" text="Blog">Here is where the main blog page will be for all the posts in information.</IntroBlock>
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
