<template>
    <main-wrapper>
        <IntroBlock :tag="1" text="What we do">
        It's cool, man. Yep. It's <strong>cool</strong>.
        </IntroBlock>
    </main-wrapper>
</template>

<script>
import IntroBlock from "@/components/Layout/IntroBlock";

export default {
  components: {
    IntroBlock
  }
};
</script>
