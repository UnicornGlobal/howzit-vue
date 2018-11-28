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
    expect(howzit.find('div').text()).toEqual('LOADING')
    expect(howzit.findAll('label').length).toEqual(0)
    expect(howzit.findAll('input').length).toEqual(0)

    setTimeout(() => {
      howzit.vm.$nextTick(() => {
        expect(howzit.vm.errored).toEqual(false)
        expect(howzit.vm.loaded).toEqual(true)
        expect(howzit.vm.token).toEqual('c089871c-af8d-435c-98ca-41d66d116bca')

        expect(howzit.find('div').text()).not.toEqual('LOADING')
        expect(howzit.findAll('p').length).toEqual(1)
        expect(howzit.find('p').text()).toEqual('Contact Formed Form 225')
        expect(howzit.findAll('div').length).toEqual(5)
        expect(howzit.findAll('label').length).toEqual(3)
        expect(howzit.findAll('input').length).toEqual(3)
      })
    }, 1)

    stub.restore()
  })

  it('Successfully submits a form', () => {
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

    setTimeout(() => {
      howzit.vm.$nextTick(() => {
        howzit.setData({
          form: [
            {
              'name': 'product',
              'label': 'Product',
              'type': 'text',
              'min_length': 3,
              'max_length': 15,
              'regex': null,
              'required': 1,
              'order_index': 1,
              'value': 'a'
            },
            {
              'name': 'email',
              'label': 'Email Address',
              'type': 'email',
              'min_length': 7,
              'max_length': 56,
              'regex': null,
              'required': 1,
              'order_index': 2,
              'value': 'b'
            },
            {
              'name': 'message',
              'label': 'Your message',
              'type': 'text',
              'min_length': 10,
              'max_length': 512,
              'regex': null,
              'required': 1,
              'order_index': 3,
              'value': 'c'
            }
          ]
        })

        let sendStub = sinon.stub(driver, 'post').resolves({data: 'OK'})

        expect(howzit.vm.submitted).toEqual(false)
        expect(howzit.vm.errored).toEqual(false)
        expect(howzit.find('div').text()).not.toEqual('SUBMITTED')

        howzit.vm.submit()

        setTimeout(() => {
          howzit.vm.$nextTick(() => {
            expect(howzit.vm.submitted).toEqual(true)
            expect(howzit.vm.errored).toEqual(false)
            expect(howzit.find('div').text()).toEqual('SUBMITTED')
          })
        }, 1)

        sendStub.restore()
      })
    }, 1)

    stub.restore()
  })

  it('Handles bad form submission', () => {
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

    setTimeout(() => {
      howzit.vm.$nextTick(() => {
        howzit.setData({
          form: [
            {
              'name': 'product',
              'label': 'Product',
              'type': 'text',
              'min_length': 3,
              'max_length': 15,
              'regex': null,
              'required': 1,
              'order_index': 1,
              'value': 'a'
            },
            {
              'name': 'email',
              'label': 'Email Address',
              'type': 'email',
              'min_length': 7,
              'max_length': 56,
              'regex': null,
              'required': 1,
              'order_index': 2,
              'value': 'b'
            },
            {
              'name': 'message',
              'label': 'Your message',
              'type': 'text',
              'min_length': 10,
              'max_length': 512,
              'regex': null,
              'required': 1,
              'order_index': 3,
              'value': 'c'
            }
          ]
        })

        let sendStub = sinon.stub(driver, 'post').rejects({error: 'Server error'})

        expect(howzit.vm.submitted).toEqual(false)
        expect(howzit.vm.errored).toEqual(false)
        expect(howzit.find('div').text()).not.toEqual('ERROR')

        howzit.vm.submit()

        setTimeout(() => {
          howzit.vm.$nextTick(() => {
            expect(howzit.vm.submitted).toEqual(false)
            expect(howzit.vm.errored).toEqual(true)
            expect(howzit.find('div').text()).toEqual('ERROR')
          })
        }, 1)

        sendStub.restore()
      })
    }, 1)

    stub.restore()
  })
})
