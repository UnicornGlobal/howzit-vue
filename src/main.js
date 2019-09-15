import Vue from 'vue'
import VeeValidate from 'vee-validate'

import Howzit from './Howzit.vue'

Vue.use(VeeValidate, {
  fieldsBagName: 'howzitFormFields',
  classes: false,
  events: 'input'
})

Howzit.install = function(Vue, options) {
  console.log('Installing howzit')
  Vue.prototype.$howzit = options
}

export default Howzit
