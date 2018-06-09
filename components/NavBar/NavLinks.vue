<template>
    <ul class="flex justify-end list-reset">
        <template v-for="(link, i) in links">
          <nav-link :key="i" :to="link.path" :name="link.name"></nav-link>
        </template>
    </ul>
</template>

<script>
import NavLink from "./NavLink.vue";
export default {
  name: 'NavLinks',
  components: {
    NavLink
  },
  props: ["links"]
};
</script>
