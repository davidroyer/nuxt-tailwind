<template>
<v-wrapper>
  <h1 class="mb-8 text-center font-bold text-4xl">Get In Touch</h1>
  <div class="w-full max-w-md mx-auto">
    <form class="bg-white shadow-lg rounded-lg px-8 py-8 my-6">
      <div class="my-6">
        <v-input v-model="form.name" id="firstName" label="Your First Name"></v-input>
      </div>
      <div class="my-6">
        <v-input v-model="form.email" id="email" type="email" label="Your Email"></v-input>
      </div>
      <div class="mb-8 pt-4 max-w-sm mx-auto">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="message">Message</label>
        <textarea id="message" v-model="form.message" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-normal" name="message" rows="8" cols="80" placeholder="Write A Message..."></textarea>
      </div>
      <div class="flex items-center justify-between max-w-sm mx-auto">
        <v-button type="submit" @click.prevent="handleSubmit" class="ml-auto bg-black hover:bg-white hover:text-black hover:border-black hover:border-2 text-white font-bold py-2 px-4 rounded">Send</v-button>
      </div>
    </form>
  </div>
</v-wrapper>
</template>


<script>
export default {
  head() {
    return {
      title: "Contact Me"
    };
  },

  data() {
    return {
      form: {
        name: "",
        email: "",
        message: ""
      }
    };
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    handleSubmit() {
      fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: this.encode({
          "form-name": "contact",
          ...this.form
        })
      })
        .then(() => alert("Success!"))
        .catch(error => alert(error));
    }
  }
};
</script>
