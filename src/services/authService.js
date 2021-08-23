import axios from 'axios'
import jwtDecode from 'jwt-decode'
const API_URL = 'http://localhost:5000/api/user/'
const TOKEN_KEY = 'userTicket'
//const API_URL = "http://192.168.225.23:5000/api/user/"

export default {
  isAuthenticated() {
    const token = localStorage.getItem(TOKEN_KEY)
    return !!token
  },

  async loginAsGuest() {
    const guestData = {
      name: 'Guest',
      email: 'guest@no.exist',
      image: null,
    }

    const res = await axios.post(`${API_URL}/login`, guestData)

    if (!res.data.accessToken) {
      return null
    }

    localStorage.setItem(TOKEN_KEY, JSON.stringify(res.data.accessToken))
    return res.data.accessToken
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY)
  },

  getCurrentUser() {
    return jwtDecode(localStorage.getItem(TOKEN_KEY))
  },
}
