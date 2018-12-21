import { loadForm, fetchForm, submitForm, sendForm } from '@/api/howzit.js'
import driver from '@/api/driver.js'

import sinon from 'sinon'

describe('Howzit API', () => {
  describe('Fetch Form (Promise)', () => {
    it('Handles Success', () => {
      let stub = sinon.stub(driver, 'get').resolves({data: 'xx'})

      const result = fetchForm(1).then(result => {
        expect(result.data).to.equal('xx')
      })

      stub.restore()
    })

    it('Handles Failures', () => {
      let stub = sinon.stub(driver, 'get').rejects()

      const result = fetchForm(1).then(error => {
        expect(typeof error).to.equal('object')
      })

      stub.restore()
    })
  })

  describe('Load Form (Async)', () => {
    it('Loads', async () => {
      let stub = sinon.stub(driver, 'get').resolves({data: 'xxyy'})

      const result = await loadForm(1)
      expect(result.data).to.equal('xxyy')

      stub.restore()
    })
  })

  describe('Submit Form (Promise)', () => {
    it('Handles Success', () => {
      let stub = sinon.stub(driver, 'post').resolves({data: 'OK'})

      const result = submitForm([], 'xxxx').then(result => {
        expect(result.data).to.equal('OK')
      })

      stub.restore()
    })

    it('Handles Failures', () => {
      let stub = sinon.stub(driver, 'post').rejects()

      const result = submitForm([], 'xx').then(error => {
        expect(typeof error).to.equal('object')
      })

      stub.restore()
    })
  })

  describe('Submit Form (Async)', () => {
    it('Loads', async () => {
      let stub = sinon.stub(driver, 'post').resolves({data: 'OK'})

      const result = await sendForm([], 'xx')
      expect(result.data).to.equal('OK')

      stub.restore()
    })
  })
})
