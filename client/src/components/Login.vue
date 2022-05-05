<template>
  <panel title='LogIn'>
    <div class="pl-4 pr-4 pt-2 pb-2">
      <v-text-field type="email" name="email" label="Email" v-model="email" placeholder="email"></v-text-field>
      <br>
      <v-text-field type="password" name="password" label="Password" v-model="password" placeholder="password"></v-text-field>
      <br>
      <div class="danger-alert" v-html="error"/>
      <v-btn color="#0af" @click="login" dark>Login</v-btn>
    </div>
  </panel>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.error = null

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        this.$router.push({name: 'songs'})
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
  // watch: {
  //   email (value) {
  //     console.log('email has changed', value)
  //   }
  // },
  // // change email after two seconds of page loading
  // mounted () {
  //   setTimeout(() => {
  //     this.email = 'hello world'
  //   }, 2000)
  // }
}
</script>

<style scoped>
.input-group--text-field input {
  border-bottom: 1px solid black;
}
</style>
