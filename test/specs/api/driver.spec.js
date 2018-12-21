import driver from '@/api/driver.js'

describe('driver.js', () => {
  describe('boot', () => {
    it('Has the right base URL', () => {
      expect(driver.defaults.baseURL).to.equal(process.env.HOWZIT_API)
      expect(driver.defaults.headers.common['App']).to.equal(process.env.APP_ID)
    })
  })
})
