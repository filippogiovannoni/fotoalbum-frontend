<script>
import AppHeader from './components/header/AppHeader.vue'
import AppMain from './components/AppMain.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: { AppHeader, AppMain, AppFooter },
  data() {
    return {

    }
  }
}
</script>

<template>

  <AppHeader></AppHeader>

  <AppMain></AppMain>

  <AppFooter></AppFooter>


</template>

<style>
body {
  background-color: #ebebeb;
  font-family: "Dosis", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
</style>
