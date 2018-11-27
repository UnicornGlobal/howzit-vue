import driver from '@/api/driver.js'

describe('driver.js', () => {
  describe('boot', () => {
    it('Has the right base URL', () => {
      expect(driver.defaults.howzitUrl).toEqual(process.env.apiUrl)
    })
  })
})
