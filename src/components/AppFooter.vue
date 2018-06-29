<template>
  <footer
    class="bg-black text-white text-sm w-full flex flex-col items-center justify-center py-6"
    role="contentinfo"
    itemscope
    itemtype="http://schema.org/WPFooter">
    <div>Copyright &copy; {{ fullYear }} David Royer</div>
    <div class="social-links flex justify-center">
      <a class="m-2" href="https://github.com/davidroyer" target="_blank" rel="noopener" aria-label="github">
        <v-icon name="github"></v-icon>
      </a>
      <a class="m-2" href="https://twitter.com/DavidRoyer_" target="_blank" rel="noopener" aria-label="twitter">
        <v-icon name="twitter"></v-icon>
      </a>
      <a class="m-2" href="https://www.linkedin.com/in/dkroyer/" target="_blank" rel="noopener" aria-label="linkedIn">
        <v-icon name="linkedIn"></v-icon>
      </a>
    </div>
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
}
</script>

<style>
.svg-inline--fa {
  font-size: 24px;
}
</style>
