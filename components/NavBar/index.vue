<template>
    <div class="navbar">
      <logo></logo>
      <button
        @click="$store.commit('toggleMenuState')"
        class="nav-btn"
        :class="{'text-white font-bold': $store.state.menuIsActive}">
        Menu
      </button>

      <transition name="mobile-nav">
        <nav-links v-if="showMenu" :links="links"></nav-links>
      </transition>

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

  data: () => ({
    links: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Blog", path: "/blog" }
    ],
    windowWidth: 0,
    windowHeight: 0
  }),

  computed: {
    isMobile() {
      return this.windowWidth <= 767
    },

    showMenu() {
      if (!this.isMobile) return true;
      if (this.isMobile && this.$store.state.menuIsActive) return true
      else return false
    },

    width() {
      return this.getWindowWidth();
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


  watch: {
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
