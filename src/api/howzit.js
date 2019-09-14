import Vue from 'vue'
import driver from '@/api/driver'

const fetchForm = (formId) => {
  return driver
    .get(`/${formId}`)
    .then(result => {
      return result
    })
    .catch(error => {
      return error
    })
}

const submitForm = (fields, formId) => {
  return driver
    .post(`/${formId}/submit`, fields)
    .then(result => {
      return result
    })
    .catch(error => {
      return {
        data: {
          success: false
        }
      }
    })
}

export async function loadForm(formId) {
  const formData = await fetchForm(formId)
  return formData
}

export async function sendForm(fields, formId) {
  const response = await submitForm(fields, formId)
  return response
}

export { fetchForm, submitForm }
