import Howzit from './Howzit.vue'

Howzit.install = function(Vue, options) {
  console.log('Installing howzit')
  Vue.prototype.$howzit = options
}

export default Howzit
