<template lang="html">
  <div class="hero">
    <slot>
      <headline :tag="tag">{{text}}</headline>
    </slot>
  </div>
</template>

<script>
// import Headline from "~/components/Typography/Headline";

export default {
  name: "Hero",

  components: {
    // Headline
  },

  props: ["tag", "text"]
};
</script>
