<template>
    <component :is="'h' + tag" class="mb-4 text-purple-dark leading-tight">
        <slot>
            This is the default text
        </slot>
    </component>
</template>

<script>
export default {
  props: ["tag"]
};
</script>
