<template>
<form name="contact" netlify>
  <p>
    <label>
      Your Name: <input type="text" name="name" v-model="form.name" />
    </label>
  </p>
  <p>
    <label>
      Your Email: <input type="email" name="email" v-model="form.email" />
    </label>
  </p>
  <p>
    <label>
      Message: <textarea name="message" v-model="form.message" />
    </label>
  </p>
  <p>
    <button type="submit" @click.prevent="handleSubmit">Send</button>
  </p>
</form>
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
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({ "form-name": "contact", ...this.form })
      })
        .then(() => alert("Success!"))
        .catch(error => alert(error));
    }
  }
};
</script>
