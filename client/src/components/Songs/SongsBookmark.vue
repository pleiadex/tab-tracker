<template>
  <panel title='Bookmarks'>
    <v-data-table
      :headers="headers"
      :items="bookmarks"
      :items-per-page="-1"
      class="elevation-1"
      :sort-by="['createdAt']"
      :sort-desc="[true]"
    ></v-data-table>
  </panel>
</template>

<script>
import { mapState } from 'vuex'
import BookmarksService from '@/services/BookmarksService'
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
      bookmarks: []
      // bookmarks: [
      //   {
      //     title: 'Loser',
      //     artist: 'Bigbang'
      //   },
      //   {
      //     title: 'test title',
      //     artist: 'test artist'
      //   }
      // ]
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
      this.bookmarks = (await BookmarksService.index({
      })).data
    }
  }
}
</script>

<style scoped>

</style>
