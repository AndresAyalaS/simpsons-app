import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '@/components/UI/Pagination.vue'

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 3,
    totalPages: 10,
    totalItems: 200,
    itemsPerPage: 20,
  }

  it('renders pagination info correctly', () => {
    const wrapper = mount(Pagination, {
      props: defaultProps,
    })

    expect(wrapper.text()).toContain('Mostrando 41 a 60 de 200 resultados')
  })

  it('renders current page correctly', () => {
    const wrapper = mount(Pagination, {
      props: defaultProps,
    })

    expect(wrapper.text()).toContain('3')
  })

  it('calculates page range correctly', () => {
    const wrapper = mount(Pagination, {
      props: defaultProps,
    })

    // Should show current page
    expect(wrapper.text()).toContain('3')
  })

  it('handles first page correctly', () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        currentPage: 1,
      },
    })

    expect(wrapper.text()).toContain('Mostrando 1 a 20 de 200 resultados')
  })

  it('handles last page correctly', () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        currentPage: 10,
      },
    })

    expect(wrapper.text()).toContain('Mostrando 181 a 200 de 200 resultados')
  })

  it('handles edge case with 1 page', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 10,
        itemsPerPage: 20,
      },
    })

    expect(wrapper.text()).toContain('Mostrando 1 a 10 de 10 resultados')
  })

  it('has correct component structure', () => {
    const wrapper = mount(Pagination, {
      props: defaultProps,
    })

    expect(wrapper.find('.flex').exists()).toBe(true)
  })
})
