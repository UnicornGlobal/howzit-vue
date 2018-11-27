import driver from 'axios'

driver.defaults.howzitUrl = process.env.apiUrl

export default driver
