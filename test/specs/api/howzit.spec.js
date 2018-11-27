import { loadForm, fetchForm } from '@/api/howzit.js'
import driver from '@/api/driver.js'

import sinon from 'sinon'

describe('Howzit API', () => {
  describe('Fetch Form (Promise)', () => {
    it('Handles Success', () => {
      let stub = sinon.stub(driver, 'get').resolves({data: 'xx'})

      const result = fetchForm(1).then(result => {
        expect(result.data).toEqual('xx')
      })

      stub.restore()
    })

    it('Handles Failures', () => {
      let stub = sinon.stub(driver, 'get').rejects()

      const result = fetchForm(1).then(error => {
        expect(typeof error).toEqual('object')
      })

      stub.restore()
    })
  })

  describe('Load Form (Async)', () => {
    it('Loads', async () => {
      let stub = sinon.stub(driver, 'get').resolves({data: 'xxyy'})

      const result = await loadForm(1)
      expect(result.data).toEqual('xxyy')

      stub.restore()
    })
  })
})
