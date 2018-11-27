import driver from '@/api/driver'

const fetchForm = (formId) => {
  return driver
    .get(`api/public/forms/${formId}`)
    .then(result => {
      return result
    })
    .catch(error => {
      return error
    })
}

export async function loadForm(formId) {
  const formData = await fetchForm(formId)
  return formData
}

export { fetchForm }
