<template>
  <FontAwesomeIcon
    v-if="source === 'font-awesome'"
    :icon="fontAwesomeIcon"
    :width="fontSize"
    :style="{ color: iconColor, fontSize: fontSize }"
    v-bind="$attrs"
    v-on="$listeners"
    :class="['icon', {'button': button}]"
  />
  <span
    v-else-if="source === 'custom'"
    :class="customIconClass"
  />
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import camelCase from 'lodash/camelCase'

export default {
  name: 'VIcon',
  inheritAttrs: false,
  components: {
    FontAwesomeIcon
  },
  props: {
    button: {
      type: Boolean,
      default: false
    },
    source: {
      type: String,
      default: 'font-awesome'
    },
    name: {
      type: String,
      required: true
    },
    fontSize: {
      type: String,
      default: '24px'
    },
    iconColor: {
      type: String
    }
  },
  computed: {
    // https://fontawesome.com/icons
    fontAwesomeIcon() {
      return {
        // Add new icons to this list as you need them
        sync: require('@fortawesome/fontawesome-free-solid/faSync'),
        user: require('@fortawesome/fontawesome-free-solid/faUser'),
        star: require('@fortawesome/fontawesome-free-solid/faStar'),
        xCircle: require('@fortawesome/fontawesome-free-regular/faTimesCircle'),

        github: require('@fortawesome/fontawesome-free-brands/faGithub'),
        twitter: require('@fortawesome/fontawesome-free-brands/faTwitter'),
        linkedIn: require('@fortawesome/fontawesome-free-brands/faLinkedinIn')
      }[this.name]
    },
    // Gets a CSS module class, e.g. iconCustomLogo
    customIconClass() {
      return this.$style[camelCase('icon-custom-' + this.name)]
    }
  }
}
</script>

<style lang="scss">
.icon {
  &.button {
    cursor: pointer;
  }
}
</style>
