<template>
    <component :is="'h' + tag" class="mb-4 font-semibold md:font-bold text-indigo-darker leading-tight">
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
