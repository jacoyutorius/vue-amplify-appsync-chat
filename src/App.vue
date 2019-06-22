<template>
  <div id="app">
    <h1 class="title">Vue + Amplify + AppSync</h1>

    <div id="nav" class="tabs is-centered is-toggle is-toggle-rounded">
      <ul>
        <li v-bind:class="homeIsActive"><router-link to="/">Home</router-link></li>
        <li v-bind:class="aboutIsActive"><router-link to="/about">About</router-link></li>
      </ul>
    </div>

    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    homeIsActive: function() {
      return this.$route.name === 'home' ? 'is-active' : '';
    },
    aboutIsActive: function() {
      return this.$route.name === 'about' ? 'is-active' : '';
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
