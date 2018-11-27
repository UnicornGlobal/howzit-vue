import Howzit from '../../src/main.js'
import driver from '@/api/driver.js'

import { createLocalVue, mount } from '@vue/test-utils'
import sinon from 'sinon'

let localVue = createLocalVue()
localVue.use(Howzit, {
  config: {
    name: 'Test Form'
  }
})

describe('Howzit.vue', () => {
  it('Installs correctly', () => {
    expect(typeof localVue.prototype.$howzit).toBe('object')
  })

  it('Mounts correctly', () => {
    let stub = sinon.stub(driver, 'get').resolves({data: 'xx'})

    let howzit = mount(Howzit, {
      localVue,
      propsData: {
        formId: 'xxx'
      }
    })

    expect(howzit.vm.loaded).toEqual(false)
    expect(howzit.vm.token).toEqual(null)
    expect(howzit.contains('div')).toEqual(true)

    stub.restore()
  })
})
