<template>
  <div>
    <headline :tag="tag">{{ text }}</headline>
    <p class="text-grey-darkest leading-loose">
      <slot></slot>
    </p>
  </div>
</template>

<script>
import Headline from "~/components/Typography/Headline";

export default {
  components: {
    Headline
  },
  props: ["tag", "text"]
};
</script>
