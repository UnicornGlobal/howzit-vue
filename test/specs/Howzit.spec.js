import Howzit from '../../src/main.js'
import driver from '@/api/driver.js'

import { createLocalVue, shallowMount } from '@vue/test-utils'
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

  it('Handled bad remote form', () => {
    let stub = sinon.stub(driver, 'get').resolves({x:'x'})

    let howzit = shallowMount(Howzit, {
      localVue,
      propsData: {
        formId: 'xxx'
      }
    })

    expect(howzit.vm.errored).toEqual(false)

    setTimeout(() => {
      howzit.vm.$nextTick(() => {
        expect(howzit.vm.errored).toEqual(true)
      })
    }, 1)

    stub.restore()
  })

  it('Loads a remote form', () => {
    let stub = sinon.stub(driver, 'get').resolves({
      'form': {
        'name': 'Formed Form 225',
        'owner_email': 'test@howzit.com',
        'fields': [
          {
            'name': 'product',
            'label': 'Product',
            'type': 'text',
            'min_length': 3,
            'max_length': 15,
            'regex': null,
            'required': 1,
            'order_index': 1
          },
          {
            'name': 'email',
            'label': 'Email Address',
            'type': 'email',
            'min_length': 7,
            'max_length': 56,
            'regex': null,
            'required': 1,
            'order_index': 2
          },
          {
            'name': 'message',
            'label': 'Your message',
            'type': 'text',
            'min_length': 10,
            'max_length': 512,
            'regex': null,
            'required': 1,
            'order_index': 3
          }
        ]
      },
      'token': 'c089871c-af8d-435c-98ca-41d66d116bca'
    })

    let howzit = shallowMount(Howzit, {
      localVue,
      propsData: {
        formId: 'abc'
      }
    })

    expect(howzit.vm.loaded).toEqual(false)
    expect(howzit.vm.token).toEqual(null)
    expect(howzit.contains('div')).toEqual(true)

    setTimeout(() => {
      howzit.vm.$nextTick(() => {
        expect(howzit.vm.errored).toEqual(false)
        expect(howzit.vm.loaded).toEqual(true)
        expect(howzit.vm.token).toEqual('c089871c-af8d-435c-98ca-41d66d116bca')
      })
    }, 1)
  })
})
