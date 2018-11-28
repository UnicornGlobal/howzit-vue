import driver from 'axios'

driver.defaults.baseURL = process.env.HOWZIT_API
driver.defaults.headers.common['App'] = process.env.APP_ID

export default driver
