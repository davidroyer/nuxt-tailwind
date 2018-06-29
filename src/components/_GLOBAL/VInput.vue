<template>
  <div class="input max-w-sm mx-auto my-6">
    <label v-text="label" :for="id" class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"></label>
    <input
      :type="type"
      :value="value"
      :id="id"
      :name="id"
      class="appearance-none block w-full text-grey-darker border border-grey-light rounded py-2 px-4 leading-tight"
      :class="$style.input"
      v-on="listeners"
      v-bind="$attrs"
    >
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'VInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event.target.value)
      }
    }
  }
}
</script>

<style lang="scss" module>
.input {
  // display: block;
  // width: 100%;
}
</style>
