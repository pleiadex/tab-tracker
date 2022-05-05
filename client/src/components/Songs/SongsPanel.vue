<template>
  <panel title='Songs'>
    <router-link slot='action' :to="{name: 'songs-create'}">
      <v-btn
        fab
        class="cyan accent-2"
        medium
        absolute
        right
        middle
        light
      >
      <v-icon>add</v-icon>
      </v-btn>
    </router-link>
    <div class='song' v-for='song in songs' :key='song.id'>
      <v-row>
        <v-col :cols="7">
          <div class='song-title'>
            {{song.title}}
          </div>
          <div class='song-artist'>
            {{song.artist}}
          </div>
          <div class='song-genre'>
            {{song.genre}}
          </div>
          <v-btn dark small color="#0af"
            :to="{
              name: 'songs-view',
              params: {
                songId: song.id
              }
            }">
            See details
          </v-btn>
        </v-col>
        <v-col :cols="4">
          <img class='album-image' :src='song.albumImageUrl'>
        </v-col>
      </v-row>
    </div>
  </panel>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    // Do a request to the backend for all the song
    this.songs = (await SongsService.index()).data
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
      }
    }
  }
}
</script>

<style scoped>
/* .song {
  padding: 20px;
  height: 30px;
  overflow: hidden;
} */
.song-title {
  font-size: 30px;
}
.song-artist {
  font-size: 24px;
}
.song-genre {
  font-size: 18px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
