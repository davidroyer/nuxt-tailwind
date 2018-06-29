<template>
  <div class="app-wrapper">
    <app-header/>
    <app-main/>
    <app-footer/>
  </div>
</template>

<script>
import AppMain from '@/components/AppMain'
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'

export default {
  components: {
    AppMain,
    AppHeader,
    AppFooter
  }
}
</script>
