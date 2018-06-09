<template>
    <li class="block px-4">
        <nuxt-link
            :to="to"
            class="nav-link hover:border-grey">{{ name }}</nuxt-link>
    </li>
</template>

<script>
export default {
  name: 'NavLink',
  props: ["to", "name"]
};
</script>
