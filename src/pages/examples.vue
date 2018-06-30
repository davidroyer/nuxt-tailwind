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

      <section class="border-b-2 my-8 py-8 promiseTest">
        <h2 class="mb-4">Promise Test - Without babel-ie-preset</h2>
        <div>{{$store.state.testValue}}</div>
        <v-button @click="$store.dispatch('promiseTest')">Run</v-button>

      </section>

      <section class="border-b-2 my-8 py-8 vicons">
        <h2 class="mb-4">Icons</h2>
        <v-icon name="user"></v-icon>
        <v-icon name="xCircle"></v-icon>
        <v-icon name="star"></v-icon>
        <hr class="examples-hr">
        <v-icon font-size="40px" name="user"></v-icon>
        <v-icon font-size="40px" name="xCircle"></v-icon>
        <v-icon font-size="40px" name="star"></v-icon>
      </section>

      <section class="border-b-2 my-8 py-8 vinputs">
        <h2 class="mb-4">Inputs</h2>
        <v-input id="name" label="Your Name"></v-input>
      </section>

      <section class="border-b-2 my-8 py-8 vbuttons">
        <h2 class="text-center mb-4">Buttons</h2>
        <v-button @click="handleClick">Do Something</v-button>
        <form action="/" method="post">
          <v-input id="firstName" label="First Name"></v-input>
          <v-input id="lastName" label="Last Name"></v-input>
          <v-button class="mx-2" type="reset" value="Reset">Reset</v-button>
          <v-button class="mx-2" type="submit" value="Submit">Submit</v-button>
        </form>
      </section>

      <section class="border-b-2 my-8 py-8 vsidebar">
        <h2 class="mb-4">Sidebar</h2>
        <v-button @click="$store.commit('toggleSidebar')">Sidebar</v-button>
        <v-transition name="slide-x">
          <v-sidebar class="bg-grey-darkest text-white" v-if="$store.state.sidebarOpen">
            <v-icon font-size="32px" class="fixed sidebar-close" name="xCircle" button @click="$store.commit('toggleSidebar')"></v-icon>
            Something here
          </v-sidebar>
        </v-transition>
      </section>


    </v-wrapper>
  </div>
</template>

<script>
const metaDescription =
  "Examples demonstrating the features of this Nuxt.js starter template including the Global Component Library bundled with this starter template, which is made up components for icons, inputs, sidebars, and more.";

export default {
  head() {
    return {
      title: "Examples",
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
  },
  methods: {
    handleClick() {
      alert("You did something.");
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
  position: relative;
  & > h2 {
    text-align: center;
    flex-basis: 100%;
    font-style: italic;
    font-weight: 300;
    font-size: 2.5rem;
  }
}
.hero {
  background-image: url("~/assets/images/blog-me.jpeg");
}

.sidebar-close {
  right: 10px;
  top: 10px;
  z-index: 9999999;
}
.examples-hr {
  flex-basis: 100%;
  margin: 2em 0;
}
</style>
