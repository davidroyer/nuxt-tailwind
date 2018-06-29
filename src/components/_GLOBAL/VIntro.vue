<template>
  <div>
    <v-headline :tag="tag" :class="headlineClasses">{{ text }}</v-headline>
    <p class="text-grey-darkest leading-loose">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  props: ['tag', 'text', 'headlineClasses']
}
</script>
