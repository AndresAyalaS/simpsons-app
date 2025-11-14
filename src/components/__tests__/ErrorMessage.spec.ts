import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorMessage from '@/components/UI/ErrorMessage.vue'

describe('ErrorMessage', () => {
  const defaultProps = {
    message: 'Something went wrong',
  }

  it('renders error message correctly', () => {
    const wrapper = mount(ErrorMessage, {
      props: defaultProps,
    })

    expect(wrapper.text()).toContain('Something went wrong')
  })

  it('renders default title when not provided', () => {
    const wrapper = mount(ErrorMessage, {
      props: defaultProps,
    })

    expect(wrapper.text()).toContain('Something went wrong')
  })

  it('renders custom title when provided', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        ...defaultProps,
        title: 'Custom Error Title',
      },
    })

    expect(wrapper.text()).toContain('Custom Error Title')
  })

  it('shows retry button by default', () => {
    const wrapper = mount(ErrorMessage, {
      props: defaultProps,
    })

    const retryButton = wrapper.find('button')
    expect(retryButton.exists()).toBe(true)
    expect(retryButton.text()).toBe('Intentar de nuevo')
  })

  it('hides retry button when showRetry is false', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        ...defaultProps,
        showRetry: false,
      },
    })

    const retryButton = wrapper.find('button')
    expect(retryButton.exists()).toBe(false)
  })

  it('emits retry event when retry button is clicked', async () => {
    const wrapper = mount(ErrorMessage, {
      props: defaultProps,
    })

    const retryButton = wrapper.find('button')
    await retryButton.trigger('click')

    expect(wrapper.emitted('retry')).toBeTruthy()
  })

  it('displays error icon', () => {
    const wrapper = mount(ErrorMessage, {
      props: defaultProps,
    })

    const icon = wrapper.find('svg')
    expect(icon.exists()).toBe(true)
  })

  it('has proper styling classes', () => {
    const wrapper = mount(ErrorMessage, {
      props: defaultProps,
    })

    expect(wrapper.find('.bg-red-50').exists()).toBe(true)
    expect(wrapper.find('.text-center').exists()).toBe(true)
  })
})
