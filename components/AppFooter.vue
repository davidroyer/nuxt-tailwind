<template>
  <footer class="bg-black text-white text-sm">
     Copyright &copy; {{ fullYear }} David Royer
  </footer>
</template>

<script>
  export default {
    name: 'AppFooter',
    computed: {
      fullYear() {
        return new Date().getFullYear()
      }
    }
  };
</script>
