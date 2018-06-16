<template>
  <div class="app-wrapper flex-1 z-10 bg-white">
    <AppHeader></AppHeader>
    <nuxt class="flex-1 z-10 bg-white"/>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
// import Sidebar from '@/components/Sidebar';

export default {
  components: {
    AppHeader,
    AppFooter
  }
};
</script>
