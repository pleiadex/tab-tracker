<template>
  <panel title='Recently Viewed Songs'>
    <v-data-table
      :headers="headers"
      :items="songs"
      :items-per-page="-1"
      class="elevation-1"
      :sort-by="['createdAt']"
      :sort-desc="[true]"
    ></v-data-table>
  </panel>
</template>

<script>
import { mapState } from 'vuex'
import SongHistoryService from '@/services/SongHistoryService'
export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'title'
        },
        { text: 'Artist', value: 'artist' }
      ],
      songs: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.songs = (await SongHistoryService.index({
      })).data
    }
  }
}
</script>

<style scoped>

</style>
