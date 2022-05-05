import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('songs', {
      params: {
        search: search
      }
    })
  },
  post (song) {
    return Api().post('songs', song)
  },
  put (song) {
    return Api().post(`songs/${song.id}`, song)
  },
  show (songId) {
    return Api().get(`songs/${songId}`)
  }
}
