<template>
    <div class="navbar">
      <logo></logo>
      <button
        @click="$store.commit('toggleMenuState')"
        v-text="navButtonText"
        class="nav-btn"
        :class="{'text-white font-bold': mobileMenuIsActive}"
        aria-controls="nav-mobile"
        :aria-expanded="mobileMenuIsActive ? 'true' : 'false'">
      </button>

      <template v-if="isMobile">
        <transition name="scale">
          <nav-links id="nav-mobile" v-show="mobileMenuIsActive" :links="navLinksArray"></nav-links>
        </transition>
      </template>
      <nav-links v-if="!isMobile" :links="navLinksArray"></nav-links>
    </div>
</template>

<script>
import NavLinks from "./NavLinks";
import Logo from "./Logo";

export default {
  name: "NavBar",
  components: {
    NavLinks,
    Logo
  },

  data: () => ({
    windowWidth: 0,
    windowHeight: 0
  }),

  computed: {
    navLinksArray() {
      return this.$store.state.navLinks;
    },

    mobileMenuIsActive() {
      return this.$store.state.menuIsActive;
    },

    navButtonText() {
      return this.mobileMenuIsActive ? "Close" : "Menu";
    },

    isMobile() {
      return this.windowWidth <= 767;
    }
  },

  mounted() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);
      window.addEventListener("resize", this.getWindowHeight);

      //Init
      this.getWindowWidth();
      this.getWindowHeight();
    });
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
    window.removeEventListener("resize", this.getWindowWidth);
    window.removeEventListener("resize", this.getWindowHeight);
  }
};
</script>
