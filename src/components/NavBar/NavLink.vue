<template>
  <li class="nav-item">
    <nuxt-link :to="to" class="nav-link">
      <span class="nav-link-text pb-2">{{ name }}</span>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: "NavLink",
  props: ["to", "name"]
};
</script>
