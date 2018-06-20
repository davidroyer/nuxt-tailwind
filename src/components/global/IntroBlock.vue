<template>
  <div>
    <headline :tag="tag" :class="headlineClasses">{{ text }}</headline>
    <p class="text-grey-darkest leading-loose">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  props: ["tag", "text", "headlineClasses"]
};
</script>
