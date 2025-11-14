import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue'

describe('LoadingSpinner', () => {
  it('renders default loading message', () => {
    const wrapper = mount(LoadingSpinner)

    expect(wrapper.text()).toContain('Cargando...')
  })

  it('renders custom message when provided', () => {
    const wrapper = mount(LoadingSpinner, {
      props: {
        message: 'Cargando personajes...',
      },
    })

    expect(wrapper.text()).toContain('Cargando personajes...')
  })

  it('displays loading spinner element', () => {
    const wrapper = mount(LoadingSpinner)

    const spinner = wrapper.find('.animate-spin')
    expect(spinner.exists()).toBe(true)
  })

  it('has proper structure', () => {
    const wrapper = mount(LoadingSpinner)

    expect(wrapper.find('.flex').exists()).toBe(true)
    expect(wrapper.find('.text-center').exists()).toBe(true)
  })
})
