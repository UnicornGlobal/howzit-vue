import driver from 'axios'

export const configure = (config) => {
  driver.defaults.baseURL = config.url
  driver.defaults.headers.common['App'] = config.appId
  driver.defaults.headers.common['Debug-Token'] = config.debugToken
}

export default driver
