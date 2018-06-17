<template>
  <nav class="nav">
    <ul class="nav-list">
      <nav-link v-for="(link, i) in links" :key="i" :to="link.path" :name="link.name"></nav-link>
    </ul>
  </nav>
</template>

<script>
import NavLink from "./NavLink.vue";
export default {
  name: "NavLinks",
  components: {
    NavLink
  },
  props: ["links"]
};
</script>
