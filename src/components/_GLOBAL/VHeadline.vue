<template>
  <component :is="'h' + tag" class="mb-4 leading-tight" :class="headlineClasses">
    <slot>
        This is the default text
    </slot>
  </component>
</template>

<script>
export default {
  props: ['tag', 'headlineClasses']
}
</script>
