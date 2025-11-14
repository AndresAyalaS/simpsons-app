import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { ref } from 'vue'
import CharactersView from '@/views/CharactersView.vue'
import { useCharacters } from '@/composables/useCharacters'

// Mock the useCharacters composable
vi.mock('@/composables/useCharacters')

const mockUseCharacters = vi.mocked(useCharacters)

describe('CharactersView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    // Mock implementation
    mockUseCharacters.mockReturnValue({
      state: {
        data: [
          {
            id: 1,
            name: 'Homer Simpson',
            image: '/character/1.webp',
            occupation: ['Nuclear Plant Worker'],
            description: 'Homer is a loving father and husband',
            firstAppearance: 'Good Night',
            voicedBy: ['Dan Castellaneta'],
            relatives: [],
          },
          {
            id: 2,
            name: 'Marge Simpson',
            image: '/character/2.webp',
            occupation: ['Homemaker'],
            description: 'Marge is the mother of the Simpson family',
            firstAppearance: 'Good Night',
            voicedBy: ['Julie Kavner'],
            relatives: [],
          },
        ],
        loading: false,
        error: null,
        pagination: {
          page: 1,
          totalPages: 5,
          totalItems: 100,
          itemsPerPage: 20,
        },
      },
      searchQuery: ref(''),
      fetchCharacters: vi.fn(),
      searchCharacters: vi.fn(),
      getCharacterById: vi.fn(),
      changePage: vi.fn(),
      retry: vi.fn(),
      cleanup: vi.fn(),
    })
  })

  it('renders characters list correctly', () => {
    const wrapper = mount(CharactersView, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(wrapper.text()).toContain('Homer Simpson')
    expect(wrapper.text()).toContain('Marge Simpson')
    expect(wrapper.find('.grid').exists()).toBe(true)
  })

  it('calls fetchCharacters on mount', () => {
    const mockFetchCharacters = vi.fn()
    mockUseCharacters.mockReturnValue({
      state: {
        data: [],
        loading: false,
        error: null,
        pagination: { page: 1, totalPages: 1, totalItems: 0, itemsPerPage: 20 },
      },
      searchQuery: ref(''),
      fetchCharacters: mockFetchCharacters,
      searchCharacters: vi.fn(),
      getCharacterById: vi.fn(),
      changePage: vi.fn(),
      retry: vi.fn(),
      cleanup: vi.fn(),
    })

    mount(CharactersView, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(mockFetchCharacters).toHaveBeenCalledWith()
  })

  it('displays loading state', () => {
    mockUseCharacters.mockReturnValue({
      state: {
        data: [],
        loading: true,
        error: null,
        pagination: { page: 1, totalPages: 1, totalItems: 0, itemsPerPage: 20 },
      },
      searchQuery: ref(''),
      fetchCharacters: vi.fn(),
      searchCharacters: vi.fn(),
      getCharacterById: vi.fn(),
      changePage: vi.fn(),
      retry: vi.fn(),
      cleanup: vi.fn(),
    })

    const wrapper = mount(CharactersView, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(wrapper.findComponent({ name: 'LoadingSpinner' }).exists()).toBe(true)
    expect(wrapper.text()).toContain('Cargando personajes...')
  })

  it('displays error state', () => {
    mockUseCharacters.mockReturnValue({
      state: {
        data: [],
        loading: false,
        error: { message: 'Failed to fetch characters', status: 500 },
        pagination: { page: 1, totalPages: 1, totalItems: 0, itemsPerPage: 20 },
      },
      searchQuery: ref(''),
      fetchCharacters: vi.fn(),
      searchCharacters: vi.fn(),
      getCharacterById: vi.fn(),
      changePage: vi.fn(),
      retry: vi.fn(),
      cleanup: vi.fn(),
    })

    const wrapper = mount(CharactersView, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(wrapper.findComponent({ name: 'ErrorMessage' }).exists()).toBe(true)
  })

  it('displays empty state', () => {
    mockUseCharacters.mockReturnValue({
      state: {
        data: [],
        loading: false,
        error: null,
        pagination: { page: 1, totalPages: 1, totalItems: 0, itemsPerPage: 20 },
      },
      searchQuery: ref(''),
      fetchCharacters: vi.fn(),
      searchCharacters: vi.fn(),
      getCharacterById: vi.fn(),
      changePage: vi.fn(),
      retry: vi.fn(),
      cleanup: vi.fn(),
    })

    const wrapper = mount(CharactersView, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(wrapper.text()).toContain('No se encontraron personajes')
  })

  it('handles search functionality', async () => {
    const mockSearchCharacters = vi.fn()
    const searchQuery = ref('')

    mockUseCharacters.mockReturnValue({
      state: {
        data: [],
        loading: false,
        error: null,
        pagination: { page: 1, totalPages: 1, totalItems: 0, itemsPerPage: 20 },
      },
      searchQuery,
      fetchCharacters: vi.fn(),
      searchCharacters: mockSearchCharacters,
      getCharacterById: vi.fn(),
      changePage: vi.fn(),
      retry: vi.fn(),
      cleanup: vi.fn(),
    })

    const wrapper = mount(CharactersView, {
      global: {
        plugins: [createPinia()],
      },
    })

    // Find and interact with search input
    const searchInput = wrapper.find('input[type="text"]')
    await searchInput.setValue('Homer')

    // Update the ref to trigger the search
    searchQuery.value = 'Homer'

    // Wait for the next tick to allow the composable to react
    await wrapper.vm.$nextTick()

    expect(mockSearchCharacters).toHaveBeenCalledWith('Homer')
  })
})
