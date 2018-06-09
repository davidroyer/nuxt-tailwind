<template>
    <li class="block px-4">
        <nuxt-link 
            :to="to" 
            class="py-2 tracking-wide font-bold uppercase text-grey-dark text-sm no-underline border-b-2 border-transparent hover:border-grey">{{ name }}</nuxt-link>
    </li>
</template>

<script>
export default {
  props: ["to", "name"]
};
</script>
