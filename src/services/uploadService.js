const axios = require('axios')

const API_URL = 'http://localhost:5000'

export default {
  async uploadImage(imageData) {
    const res = await axios.post(API_URL, imageData, {})
    return res.data
  },
}
