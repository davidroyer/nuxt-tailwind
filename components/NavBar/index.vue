<template>
    <div class="navbar">
      <logo></logo>
      <nav-links :links="links"></nav-links>
    </div>
</template>

<script>
import NavLinks from "./NavLinks";
import Logo from "./Logo";

export default {
  name: 'NavBar',
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
