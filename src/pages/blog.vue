<template>
  <v-wrapper>
    <v-intro :tag="1" text="Blog" headlineClasses="font-semibold text-5xl">Here is where the main blog page will be for all the posts in information.</v-intro>
    <v-card class="bg-white"></v-card>
  </v-wrapper>
</template>

<script>
const metaDescription = "Blog Articles on Web Development";

export default {
  head() {
    return {
      title: "Blog",
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
