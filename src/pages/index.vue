<template>
  <main-wrapper>
    <IntroBlock :tag="1" text="Tailwind styleguide with NuxtJS!">
      It's a real pleasure to have you here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, similique atque doloribus consectetur error voluptatem esse rerum repellat temporibus voluptatum labore excepturi minus eius cumque quasi inventore at alias repellendus.
    </IntroBlock>
  </main-wrapper>
</template>

<script>
import IntroBlock from "~/components/Layout/IntroBlock";

export default {
  components: {
    IntroBlock
  }
};
</script>
