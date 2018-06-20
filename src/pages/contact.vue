<template>
<main-wrapper>
  <h1 class="mb-6 text-center font-semibold text-5xl">Get In Touch</h1>
  <div class="w-full max-w-md mx-auto">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="firstName">
            Name
          </label>
        <input v-model="form.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight" id="firstName" type="text" placeholder="Your First Name">
      </div>
      <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="email">
            Email
          </label>
        <input v-model="form.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight" id="email" type="email" placeholder="Your Email">
      </div>
      <div class="mb-6">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="email">
            Email
          </label>
        <textarea v-model="form.message" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-normal" name="message" rows="8" cols="80"></textarea>
      </div>
      <div class="flex items-center justify-between">
        <button type="submit" @click.prevent="handleSubmit" class="ml-auto bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
            Send
          </button>
      </div>
    </form>
  </div>
</main-wrapper>
</template>


<script>
export default {
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
