<template>
    <div class="navbar">
      <logo></logo>
      <button
        @click="$store.commit('toggleMenuState')"
        class="nav-btn btn btn-blue md:hidden">
        Menu
      </button>
      <nav-links v-if="showMenu" :links="links"></nav-links>
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
      ],
      windowWidth: 0,
      windowHeight: 0
    };
  },

  computed: {
    isMobile() {
      return this.windowWidth <= 767
    },

    showMenu() {
      if (!this.isMobile) return true;
      if (this.$store.state.menuIsActive) return true
      else return false
    }
  },

  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      window.addEventListener('resize', this.getWindowHeight);

      //Init
      this.getWindowWidth()
      this.getWindowHeight()
    })
  },

  methods: {
    getWindowWidth(event) {
        this.windowWidth = document.documentElement.clientWidth;
      },

      getWindowHeight(event) {
        this.windowHeight = document.documentElement.clientHeight;
      }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
    window.removeEventListener('resize', this.getWindowHeight);
  }
};
</script>
