<template>
<panel title='Song Metadata'>
<v-row>
  <v-col>
    <div class='song-title'>
      {{song.title}}
    </div>
    <div class='song-artist'>
      {{song.artist}}
    </div>
    <div class='song-genre'>
      {{song.genre}}
    </div>
    <br>
    <v-btn dark color="#0af"
      :to="{
        name: 'songs-edit',
        params () {
          return {
            songId: song.id
          }
        }
      }">
      Edit
    </v-btn>
    <v-btn
      v-if="isUserLoggedIn && !bookmark"
      dark
      color="#0af"
      @click="setAsBookmark">
      Set As Bookmark
    </v-btn>
    <v-btn
      v-if="isUserLoggedIn && bookmark"
      dark
      color="#0af"
      @click="unsetAsBookmark">
      Unset Bookmark
    </v-btn>
  </v-col>
  <v-col>
    <img class='album-image' :src='song.albumImageUrl'>
    <br>
      {{song.album}}
  </v-col>
</v-row>
</panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
export default {
  data () {
    return {
      bookmark: null
    }
  },
  props: {
    song: null
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    async song () {
      if (!this.isUserLoggedIn) {
        return
      }
      try {
        const bookmarks = (await BookmarksService.index({
          songId: this.$store.state.route.params.songId
        })).data
        if (bookmarks.length) {
          this.bookmark = bookmarks[0]
        }
      } catch (err) {
        console.log('Feteching bookmark error', err)
      }
    }
  },
  methods: {
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.$store.state.route.params.songId
          // userId: this.user.id -> user ID 는 백엔드에서 jwt token Extract를 통해 해결한다.
        })).data
      } catch (err) {
        console.log('setting bookmark error', err)
      }
    },
    async unsetAsBookmark () {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log('unsetting bookmark error', err)
      }
    }
  }
}
</script>

<style scoped>
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
