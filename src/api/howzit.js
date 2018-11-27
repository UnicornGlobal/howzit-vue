import Vue from 'vue'

export function loadForm(formId) {
  return Vue.axios.get(`api/public/forms/${formId}`)
    .then(response => {
      return response.data
    })
}
