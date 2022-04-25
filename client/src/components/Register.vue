<template>
  <div>
      <h1>Register</h1>

      <input type="email" name="email" v-model="email" placeholder="email">
      <br>
      <input type="password" name="password" v-model="password" placeholder="password">
      <br>
      <button @click="register">Register</button>

  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
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

</style>
