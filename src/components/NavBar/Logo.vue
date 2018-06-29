<template>
    <h2 @click="$router.push('/')" class="logo cursor-pointer text-grey-darkest">
      David<span class="logo-last-name ml-1">Royer</span>
    </h2>
</template>

<style lang="scss">
.logo {
  z-index: 9999999;
  font-size: 1.65rem;
  font-weight: 800;

  &-last-name {
    color: rgb(132, 147, 159);
  }
}
</style>
