<template lang="html">
  <div class="examples">
    <v-hero>
      <v-headline class="relative px-4 text-6xl font-light text-center text-white" :tag="1">Front End Web Developer</v-headline>
    </v-hero>

    <v-wrapper>
      <div class="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem repellat aut accusantium, ducimus eos. Aperiam fugit rerum esse at quis ducimus ipsum perspiciatis inventore doloribus provident quidem reiciendis, laudantium ad iure nam quod, repudiandae eveniet, sed soluta eaque! Sapiente possimus impedit ullam, dolor voluptatibus. Magni repellat aperiam dolores ipsam provident!</p>
        <p>Molestias in laborum optio amet cumque nulla vitae nihil ea, nisi fugit voluptas! Est iste quo nesciunt at commodi dolor itaque quos natus amet facilis rerum sint dolore aspernatur, dolorum sit nam reiciendis voluptates consectetur, ducimus deserunt sequi assumenda sunt. Amet distinctio minima tenetur ratione beatae velit repellendus. Accusamus, consequatur.</p>
        <p>Ea sint, mollitia. Atque in sint cum, inventore itaque, voluptas labore nobis! Pariatur doloribus dolorem, ducimus, quam saepe a perferendis. Iure perferendis, aut error architecto velit est ducimus vel itaque eaque ab dolor nisi voluptatum blanditiis magnam accusantium illum sunt quibusdam distinctio, doloribus dicta totam qui optio! Autem, eius, magnam.</p>
        <p>Porro, asperiores quas fugit! Distinctio suscipit officia ex porro fugit ratione, quaerat asperiores vitae dolores natus molestiae inventore, sunt velit esse facilis. Sunt quia nemo vitae autem officiis soluta eum quae iste quasi odit voluptatum harum dolores, illum fugiat quod ipsum inventore reiciendis officia quos eaque dolorum tempore, consequatur laboriosam.</p>
      </div>

      <section class="border-b-2 my-8 py-8 icons">
        <h2 class="mb-4">Icons</h2>
        <v-icon name="user"></v-icon>
        <v-icon name="xCircle"></v-icon>
        <v-icon name="star"></v-icon>
      </section>

      <section class="border-b-2 my-8 py-8 inputs">
        <h2 class="mb-4">Inputs</h2>
        <v-input inputId="name" label="Your Name"></v-input>
      </section>

      <section class="border-b-2 my-8 py-8 buttons">
        <h2 class="mb-4">Buttons</h2>
        <v-button @click="handleClick">Do Something</v-button>
      </section>
    </v-wrapper>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      alert("You did something.");
    }
  }
};
</script>

<style lang="scss">
.hero {
  background-image: url("~/assets/images/blog-me.jpeg");
}
</style>
