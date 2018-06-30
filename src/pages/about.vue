<template>
  <v-wrapper>
    <v-intro :tag="1" text="What we do">
    It's cool, man. Yep. It's <strong>cool</strong>.
  </v-intro>
  </v-wrapper>
</template>

<script>
const metaDescription = "Information on David Royer";

export default {
  head() {
    return {
      title: "About",
      meta: [
        {
          hid: "description",
          name: "description",
          content: metaDescription
        },
        {
          hid: "og:description",
          property: "og:description",
          content: metaDescription
        }
      ]
    };
  }
};
</script>
