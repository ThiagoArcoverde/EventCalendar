<template>
  <div id="nav">
    <router-link to="/"></router-link>
    <router-link to="/register"></router-link>
    <router-link to="/home"></router-link>
    <router-link to="/register/success"></router-link>
    <router-link to="/profile"></router-link>
    <router-link to="/profile/edit"></router-link>
    <router-link to="/profile/changePassword"></router-link>
    <router-link to="/profile/changePassword/success"></router-link>
    <router-link to="/event/create"></router-link>
  </div>
  <router-view />
</template>

<script>

export default {
  name: 'App',

}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #2f2f2f;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: #2f2f2f;
}
</style>
