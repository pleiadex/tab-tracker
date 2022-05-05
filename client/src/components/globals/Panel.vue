<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col>
        <div class="white elevation-2">
          <v-toolbar flat dense color="#0af" dark>
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <slot name='action'></slot>
          </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2">
            <slot>
              No slot content defined.
            </slot>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    title: ''
  }
}
</script>

<style scoped>

</style>
