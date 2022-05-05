<template>
    <v-app-bar dense fixed color="blue">
        <v-app-bar-title class="mr-4">
            <router-link
              class="home"
              tag="span"
              :to="{name: 'songs'}">
                TabTracker
            </router-link>
        </v-app-bar-title>
        <v-btn
          dark
          :to="{name: 'songs'}">
            Browse
        </v-btn>
        <v-spacer></v-spacer>
        <div v-if="!$store.state.isUserLoggedIn">
            <v-btn dark :to="{name: 'login'}">
                Login
            </v-btn>
            <v-btn class="ml-2" dark :to="{name: 'register'}">
                Sign Up
            </v-btn>
        </div>
        <div v-else>
            <v-btn class="ml-2" dark @click="logout">
                Logout
            </v-btn>
        </div>
    </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'songs'
      })
    }
  }
}
</script>

<style scoped>
.v-toolbar__title {
  font-weight: bold;
}
.v-btn:not(.v-btn--round).v-size--default {
    background-color: #0af;
}
.home {
    cursor: pointer;
}
.home:hover {
    color: yellowgreen;
}
</style>
