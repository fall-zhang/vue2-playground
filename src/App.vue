<script setup>
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

#app {
  height: 100vh;
  width: 100vw;
  overflow: auto;
}
</style>
