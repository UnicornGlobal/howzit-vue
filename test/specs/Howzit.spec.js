import Howzit from '../../src/Howzit.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
// import sinon from 'sinon'

describe('Howzit.vue', () => {
  it('Mounts correctly', () => {
    let localVue = createLocalVue()

    let howzit = shallowMount(Howzit, {
      attacheToDocument: true,
      localVue,
      propsData: {
        form: [
          {
            name: 'xx'
          }
        ]
      }
    })

    expect(howzit.contains('div')).toEqual(true)
  })
})
