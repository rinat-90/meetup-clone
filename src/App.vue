<template>
  <v-app>
    <Navigation />
    <main>
      <router-view></router-view>
    </main>

  </v-app>
</template>

<script>
  import Navigation from "./components/Partials/Navigation";
  export default {
    name: 'App',
    components:{ Navigation },
  }
</script>
<style>

</style>
