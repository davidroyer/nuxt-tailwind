<template>
    <div class="navbar">
      <!-- <logo></logo> -->
      <div class="site-logo">
        <h1 class="site-title"><nuxt-link to="/" v-html="siteTitle"></nuxt-link></h1>
        <!-- <h1 v-html="siteTitle"></h1> -->
        <p class="site-description" v-html="siteDescription"></p>
      </div>
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
          <nav id="nav-mobile" v-show="mobileMenuIsActive" class="nav">
            <ul class="nav-list">
              <li class="nav-item" v-for="(item, index) in menuItems" :key="index">
                <nuxt-link class="nav-link" :to="handleSlug(item)">
                  <span v-html="item.title" class="nav-link-text"></span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/tests">Tests</nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- <nav-links id="nav-mobile" v-show="mobileMenuIsActive" :links="navLinksArray"></nav-links> -->
        </transition>
      </template>
      <nav v-if="!isMobile" class="nav">
        <ul class="nav-list">
          <li class="nav-item" v-for="(item, index) in menuItems" :key="index">
            <nuxt-link class="nav-link" :to="handleSlug(item)">
              <span v-html="item.title" class="nav-link-text"></span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/tests">Tests</nuxt-link>
          </li>
        </ul>
      </nav>
      <!-- <nav-links v-if="!isMobile" :links="navLinksArray"></nav-links> -->
    </div>
</template>

<script>
import NavLinks from './NavLinks'
import Logo from './Logo'

export default {
  name: 'NavBar',
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
      return this.$store.state.navLinks
    },

    menuItems() {
      return this.$store.getters.menuItems
    },

    siteTitle() {
      return this.$store.getters.siteTitle
    },

    siteDescription() {
      return this.$store.getters.siteDescription
    },

    mobileMenuIsActive() {
      return this.$store.state.menuIsActive
    },

    navButtonText() {
      return this.mobileMenuIsActive ? 'Close' : 'Menu'
    },

    isMobile() {
      return this.windowWidth <= 767
    }
  },

  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth)
      window.addEventListener('resize', this.getWindowHeight)

      //Init
      this.getWindowWidth()
      this.getWindowHeight()
    })
  },

  methods: {
    handleSlug(menuItem) {
      const { url } = menuItem
      const siteUrl = `${this.$store.state.siteData.home}/`
      if (url === this.$store.state.siteData.home) return '/'
      else return url.replace(siteUrl, '/')
    },

    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth
    },

    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth)
    window.removeEventListener('resize', this.getWindowHeight)
  }
}
</script>

<style lang="scss">
.site {
  &-logo {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    padding: 1rem 0.5rem;
  }
  &-title {
    a {
      text-decoration: none;
    }
  }

  &-description {
    margin: 0;
    margin-top: -0.5rem;
  }
}
</style>
