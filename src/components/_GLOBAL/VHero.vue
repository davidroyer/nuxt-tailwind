<template lang="html">
  <div class="hero">
    <slot>
      <headline :tag="tag">{{text}}</headline>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'VHero',

  props: ['tag', 'text']
}
</script>
