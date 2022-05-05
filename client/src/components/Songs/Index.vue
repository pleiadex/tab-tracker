<template>
  <v-row>
    <v-col v-if='this.isUserLoggedIn'>
      <songs-bookmark ></songs-bookmark>
      <recently-viewed-songs></recently-viewed-songs>
    </v-col>
    <v-col>
      <song-search-panel></song-search-panel>
      <songs-panel></songs-panel>
    </v-col>
  </v-row>
</template>

<script>
import SongSearchPanel from './SongSearchPanel'
import SongsPanel from './SongsPanel'
import SongsBookmark from './SongsBookmark'
import RecentlyViewedSongs from './RecentlyViewedSongs'
import {mapState} from 'vuex'
export default {
  components: {
    SongsPanel,
    SongSearchPanel,
    SongsBookmark,
    RecentlyViewedSongs
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  }

}
</script>

<style scoped>
</style>
