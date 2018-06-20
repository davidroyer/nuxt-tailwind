<template>
  <div class="input max-w-sm mx-auto my-6">
    <label v-text="label" :for="inputId" class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"></label>
    <input
      :type="type"
      :value="value"
      :id="inputId"
      :name="inputId"
      class="appearance-none block w-full text-grey-darker border border-grey-light rounded py-3 px-4 leading-tight"
      :class="$style.input"
      v-on="listeners"
      v-bind="$attrs"
    >
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: "VInput",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: [String, Number],
      default: ""
    },
    inputId: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ""
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit("input", event.target.value)
      };
    }
  }
};
</script>

<style lang="scss" module>






































.input {
  // @extend %typography-small;
  display: block;
  width: 100%;
  // padding: $size-input-padding-vertical $size-input-padding-horizontal;
  // margin-bottom: $size-grid-padding;
  // line-height: 1;
  // border: $size-input-border solid $color-input-border;
  // border-radius: $size-input-border-radius;
}
