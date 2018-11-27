import Howzit from './Howzit.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { ToasterEvents } from 'unicorn-vue-toaster'

Howzit.install = function(Vue, options) {
  /**
   * Axios is used for xhr
   *
   * Setup interceptors to deal with success and errors
   */
  Vue.use(VueAxios, axios)
  Vue.axios.defaults.howzitUrl = process.env.apiUrl
  Vue.axios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      return Promise.reject(error)
    }
  )

  /**
   * Install the howzit configuration and load up the
   * toaster component.
   */
  Vue.prototype.$howzit = options.config
  Vue.prototype.$toaster = ToasterEvents
}

export default Howzit
