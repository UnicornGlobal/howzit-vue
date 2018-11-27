import Howzit from './Howzit.vue'

Howzit.install = function(Vue, options) {
  Vue.prototype.$howzit = options.config
}

export default Howzit
