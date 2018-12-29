import Howzit from '../../src/main.js'
import driver from '@/api/driver.js'

import { createLocalVue, shallowMount } from '@vue/test-utils'
import sinon from 'sinon'

let localVue = createLocalVue()

let validFormResponse = {
  'data': {
    'form': {
      'name': 'Formed Form 225',
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
        // ]
      ]
    },
    'token': 'c089871c-af8d-435c-98ca-41d66d116bca'
  }
}

localVue.use(Howzit, {
  url: 'https://localhost:9000',
  appId: 'xxx'
})

describe('Howzit.vue', () => {
  it('Installs correctly', () => {
    expect(localVue.prototype.$howzit).to.be.an('object')
  })

  it('Handles bad remote form', () => {
    let stub = sinon.stub(driver, 'get').resolves({x:'x'})

    let howzit = shallowMount(Howzit, {
      localVue,
      propsData: {
        formId: 'xxx'
      }
    })

    expect(howzit.vm.errored).to.equal(false)

    setTimeout(() => {
      howzit.vm.$nextTick(() => {
        expect(howzit.vm.errored).to.equal(true)
      })
    }, 1)

    stub.restore()
  })

  it('Loads a remote form', () => {
    let stub = sinon.stub(driver, 'get').resolves(validFormResponse)

    let howzit = shallowMount(Howzit, {
      localVue,
      propsData: {
        formId: 'abc'
      }
    })

    expect(howzit.vm.loaded).to.equal(false)
    expect(howzit.vm.token).to.equal(null)
    expect(howzit.contains('div')).to.equal(true)
    expect(howzit.find('div').text()).to.equal('LOADING')
    expect(howzit.find('div.howzit-loading').exists()).to.equal(true)
    expect(howzit.find('div.howzit-error').exists()).not.to.equal(true)
    expect(howzit.find('div.howzit-submitted').exists()).not.to.equal(true)
    expect(howzit.find('div.howzit-form').exists()).not.to.equal(true)
    expect(howzit.findAll('label').length).to.equal(0)
    expect(howzit.findAll('input').length).to.equal(0)

    setTimeout(() => {
      howzit.vm.$nextTick(() => {
        expect(howzit.vm.errored).to.equal(false)
        expect(howzit.vm.loaded).to.equal(true)
        expect(howzit.vm.token).to.equal('c089871c-af8d-435c-98ca-41d66d116bca')
        expect(howzit.find('div.howzit-form').exists()).to.equal(true)
        expect(howzit.find('div.howzit-loading').exists()).not.to.equal(true)

        expect(howzit.find('div').text()).not.to.equal('LOADING')
        expect(howzit.findAll('p').length).to.equal(1)
        expect(howzit.find('p').text()).to.equal('Contact Formed Form 225')
        expect(howzit.findAll('div').length).to.equal(5)
        expect(howzit.findAll('label').length).to.equal(3)
        expect(howzit.findAll('input').length).to.equal(3)
      })
    }, 1)

    stub.restore()
  })

  it('Successfully submits a form', () => {
    let stub = sinon.stub(driver, 'get').resolves(validFormResponse)

    let howzit = shallowMount(Howzit, {
      localVue,
      propsData: {
        formId: 'abc'
      }
    })

    setTimeout(() => {
      howzit.vm.$nextTick(() => {
        howzit.setData({
          form: {
            fields: [
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
          }
        })

        let sendStub = sinon.stub(driver, 'post').resolves({data: {success:true}})

        expect(howzit.vm.submitted).to.equal(false)
        expect(howzit.vm.errored).to.equal(false)
        expect(howzit.find('div').text()).not.to.equal('SUBMITTED')

        expect(howzit.find('div.howzit-form').exists()).to.equal(true)
        expect(howzit.find('div.howzit-loading').exists()).not.to.equal(true)
        expect(howzit.find('div.howzit-error').exists()).not.to.equal(true)
        expect(howzit.find('div.howzit-submitted').exists()).not.to.equal(true)

        howzit.vm.submit()

        setTimeout(() => {
          howzit.vm.$nextTick(() => {
            expect(howzit.vm.submitted).to.equal(true)
            expect(howzit.vm.errored).to.equal(false)
            expect(howzit.find('div').text()).to.equal('SUBMITTED')

            expect(howzit.find('div.howzit-form').exists()).not.to.equal(true)
            expect(howzit.find('div.howzit-loading').exists()).not.to.equal(true)
            expect(howzit.find('div.howzit-error').exists()).not.to.equal(true)
            expect(howzit.find('div.howzit-submitted').exists()).to.equal(true)
          })
        }, 1)

        sendStub.restore()
      })
    }, 1)

    stub.restore()
  })

  it('Handles bad form submission', () => {
    let stub = sinon.stub(driver, 'get').resolves(validFormResponse)

    let howzit = shallowMount(Howzit, {
      localVue,
      propsData: {
        formId: 'abc'
      }
    })

    setTimeout(() => {
      howzit.vm.$nextTick(() => {
        howzit.setData({
          form: {
            fields: [
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
          }
        })

        let sendStub = sinon.stub(driver, 'post').rejects(new Error('Request failed with status code 500'))

        expect(howzit.vm.submitted).to.equal(false)
        expect(howzit.vm.errored).to.equal(false)
        expect(howzit.find('div').text()).not.to.equal('ERROR')

        howzit.vm.submit()

        setTimeout(() => {
          howzit.vm.$nextTick(() => {
            expect(howzit.vm.submitted).to.equal(false)
            expect(howzit.vm.errored).to.equal(true)
            expect(howzit.find('div').text()).to.equal('ERROR')

            expect(howzit.find('div.howzit-form').exists()).not.to.equal(true)
            expect(howzit.find('div.howzit-loading').exists()).not.to.equal(true)
            expect(howzit.find('div.howzit-error').exists()).to.equal(true)
            expect(howzit.find('div.howzit-submitted').exists()).not.to.equal(true)
          })
        }, 1)

        sendStub.restore()
      })
    }, 1)

    stub.restore()
  })
})
