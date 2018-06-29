<template>
  <button
    class="vbutton border-2 border-black text-black"
    :class="$style.button"
    v-on="$listeners"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'VButton',
  props: ['tag', 'text']
}
</script>

<style lang="scss" module>
.button {
  cursor: pointer;
}
</style>
