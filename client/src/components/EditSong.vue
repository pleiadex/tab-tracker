<template>
  <v-row>
    <v-col :cols="4">
      <panel title='Song Metadata'>
        <v-text-field
          name="title"
          label="Title"
          v-model="song.title"
          placeholder="title"
          required
          :rules="rules.requiredData">
        </v-text-field>
        <v-text-field
          name="artist"
          label ="Artist"
          v-model="song.artist"
          placeholder="artist"
          required
          :rules="rules.requiredData">
        </v-text-field>
        <v-text-field
          name="genre"
          label="Genre"
          v-model="song.genre"
          placeholder="genre"
          required
          :rules="rules.requiredData">
        </v-text-field>
        <v-text-field
          name="album"
          label="Album"
          v-model="song.album"
          placeholder="album"
          required
          :rules="rules.requiredData">
        </v-text-field>
        <v-text-field
          name="albumImageUrl"
          label="Album Image URL"
          v-model="song.albumImageUrl"
          placeholder="album image url"
          required
          :rules="rules.requiredData">
        </v-text-field>
        <v-text-field
          name="youtubeId"
          label="Youtube URL"
          v-model="song.youtubeId"
          placeholder="youtube url"
          required
          :rules="rules.requiredData">
        </v-text-field>
      </panel>
    </v-col>
    <v-col :cols="8">
      <panel title='Song structure'>
        <v-textarea
          name="lyrics"
          label="Lyrics"
          v-model="song.lyrics"
          placeholder="lyrics"
          required
          :rules="rules.requiredData">
          <template v-slot:label>
            <div>
              Lyrics
            </div>
          </template>
        </v-textarea>
        <v-textarea
          name="tab"
          label="Tab"
          v-model="song.tab"
          placeholder="tab">
          <template v-slot:label>
            <div>
              Tab
            </div>
          </template>
        </v-textarea>
      </panel>
      <span style='color: red;' v-if="error">
        {{error}}
      </span>
      <br>
      <v-btn color="#0af" @click="save" dark>Save</v-btn>
    </v-col>
  </v-row>

</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      rules: {
        requiredData: [
          val => (val || '').length > 0 || 'This field is required'
        ]
      }
    }
  },
  async mounted () {
    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async save () {
      const songId = this.$store.state.route.params.songId
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields'
        return
      }

      // Call API
      try {
        await SongsService.put(this.song)
        this.$router.push({
          name: 'songs-view',
          params: {
            songId: songId
          }
        })
      } catch (err) {
        console.log(`Error while saving the changes: ${err}`)
      }
    }
  }
}
</script>

<style scoped>
</style>
