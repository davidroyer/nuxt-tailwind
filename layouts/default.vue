<template>
  <div>
    <nav-bar></nav-bar>
    <!-- <sidebar></sidebar> -->
    <nuxt />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
// import Sidebar from '@/components/Sidebar';

export default {
  components: {
    NavBar
    // Sidebar
  }
};
</script>
