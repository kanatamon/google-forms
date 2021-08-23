import axios from 'axios'
const API_URL = 'http://localhost:5000/api/form'

export default {
  async getForms(userId) {
    const res = await axios.get(`${API_URL}/getuserforms/${userId}`)
    return res.data
  },

  async createForm(formData) {
    const res = await axios.post(`${API_URL}/create`, formData)
    return res.data
  },

  async getForm(formId) {
    const res = await axios.get(`${API_URL}/form/${formId}`)
    return res.data
  },

  async saveForm(formData) {
    const res = await axios.put(`${API_URL}/editform`, formData)
    return res.data
  },

  async submitResponse(responseData) {
    const res = await axios.post(`${API_URL}/addresponse`, responseData)
    return res.data
  },

  async getResponse(formId) {
    const res = await axios.get(`${API_URL}/getresponse/${formId}`)
    return res.data
  },
}
