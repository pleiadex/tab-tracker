import axios from 'axios'
// https wrapping
export default() => {
  return axios.create({
    baseURL: `http://localhost:8081`
  })
}
