import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCard from '@/components/UI/BaseCard.vue'

describe('BaseCard', () => {
  const defaultProps = {
    title: 'Test Title',
    imageUrl: 'https://example.com/image.jpg',
  }

  it('renders title correctly', () => {
    const wrapper = mount(BaseCard, {
      props: defaultProps,
    })

    expect(wrapper.find('h3').text()).toBe('Test Title')
  })

  it('renders image with correct src and alt', () => {
    const wrapper = mount(BaseCard, {
      props: defaultProps,
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://example.com/image.jpg')
    expect(img.attributes('alt')).toBe('Test Title')
  })

  it('renders subtitle when provided', () => {
    const wrapper = mount(BaseCard, {
      props: {
        ...defaultProps,
        subtitle: 'Test Subtitle',
      },
    })

    expect(wrapper.text()).toContain('Test Subtitle')
  })

  it('renders description when provided', () => {
    const wrapper = mount(BaseCard, {
      props: {
        ...defaultProps,
        description: 'This is a test description',
      },
    })

    expect(wrapper.text()).toContain('This is a test description')
  })

  it('renders tags when provided', () => {
    const wrapper = mount(BaseCard, {
      props: {
        ...defaultProps,
        tags: ['Tag1', 'Tag2', 'Tag3'],
      },
    })

    expect(wrapper.text()).toContain('Tag1')
    expect(wrapper.text()).toContain('Tag2')
    expect(wrapper.text()).toContain('Tag3')
  })

  it('shows +X more when more than 3 tags', () => {
    const wrapper = mount(BaseCard, {
      props: {
        ...defaultProps,
        tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5'],
      },
    })

    expect(wrapper.text()).toContain('+2')
  })

  it('renders footer slot content', () => {
    const wrapper = mount(BaseCard, {
      props: defaultProps,
      slots: {
        footer: '<div class="test-footer">Footer Content</div>',
      },
    })

    expect(wrapper.find('.test-footer').text()).toBe('Footer Content')
  })

  it('applies hover effects on card', () => {
    const wrapper = mount(BaseCard, {
      props: defaultProps,
    })

    const card = wrapper.find('article')
    expect(card.classes()).toContain('group')
  })

  it('handles image error correctly', async () => {
    const wrapper = mount(BaseCard, {
      props: defaultProps,
    })

    const img = wrapper.find('img')
    await img.trigger('error')

    expect(img.attributes('src')).toBe('/placeholder.jpg')
  })
})
