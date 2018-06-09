<template>
    <div class="flex justify-between items-center p-4 border-b border-grey-lightest">
      <logo></logo>
      <nav-links :links="links"></nav-links>
    </div>
</template>

<script>
import NavLinks from "./NavLinks";
import Logo from "./Logo";

export default {
  components: {
    NavLinks,
    Logo
  },
  data() {
    return {
      links: [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Styleguide", path: "/styleguide" }
      ]
    };
  }
};
</script>
