<template>
    <main-wrapper>
      <IntroBlock :tag="1" text="Blog">Here is where the main blog page will be for all the posts in information.</IntroBlock>
      <card></card>
    </main-wrapper>
</template>

<script>
import MainWrapper from "~/components/Layout/MainWrapper";
import IntroBlock from "~/components/Layout/IntroBlock";
import Card from "~/components/Layout/Card";

export default {
  components: {
    MainWrapper,
    IntroBlock,
    Card
  },
  data: () => ({
    
  })
};
</script>
