<template lang="html">
  <div class="sidebar">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  min-width: 250px;
  max-width: 400px;
  width: 100%;
  padding: 3.5em 1em 1em;
}
</style>
