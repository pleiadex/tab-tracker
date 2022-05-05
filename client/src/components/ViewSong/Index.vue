<template>
  <v-container>
    <v-row>
      <v-col>
        <song-metadata :song="song"></song-metadata>
      </v-col>
      <v-col>
        <youtube :youtubeId="youtubeId"></youtube>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <lyrics :lyrics="song.lyrics"></lyrics>
      </v-col>
      <v-col>
        <tab :tab="song.tab"></tab>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SongsService from '@/services/SongsService'
import SongHistoryService from '@/services/SongHistoryService'
import SongMetadata from './SongMetadata'
import Lyrics from './Lyrics'
import Tab from './Tab'
import Youtube from './YouTube'
import { getIdFromURL } from 'vue-youtube-embed'
import {mapState} from 'vuex'

export default {
  components: {
    SongMetadata,
    Youtube,
    Lyrics,
    Tab
  },
  data () {
    return {
      song: {},
      youtubeId: ''
    }
  },
  computed: {
    ...mapState([
      'user',
      'isUserLoggedIn',
      'route'
    ])
  },
  async mounted () {
    const songId = this.route.params.songId
    if (this.isUserLoggedIn) {
      SongHistoryService.post({
        songId: songId
      })
    }

    // console.log(`The requested song id: ${songId}`)
    this.song = (await SongsService.show(songId)).data
    // console.log(this.song)
    // Parsing youtube Id
    if (this.song.youtubeId) {
      this.youtubeId = getIdFromURL(this.song.youtubeId)
    }
    // console.log(`Parsed youtube ID: ${this.youtubeId}`)
  }
}
</script>

<style scoped>
.textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 600px;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
}
</style>
