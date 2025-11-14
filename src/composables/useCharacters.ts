import { ref, reactive } from 'vue'
import type { Character, ApiState, ApiError } from '@/types/api'
import apiService from '@/services/apiService'

export function useCharacters() {
  const state = reactive<ApiState<Character>>({
    data: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 20,
    },
  })

  const searchQuery = ref('')
  let currentController: AbortController | null = null

  const handleApiCall = async <T>(
    apiCall: () => Promise<T>,
    onSuccess?: (result: T) => void,
  ): Promise<T | null> => {
    if (currentController) {
      currentController.abort()
    }
    currentController = new AbortController()

    state.loading = true
    state.error = null

    try {
      const response = await apiCall()
      if (onSuccess) {
        onSuccess(response)
      }
      return response
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        state.error = error as unknown as ApiError
        state.data = []
      }
      return null
    } finally {
      state.loading = false
      currentController = null
    }
  }

  const fetchCharacters = async (page: number = 1) => {
    const validPage = Math.max(1, Math.floor(page))

    return handleApiCall(
      () => apiService.getCharacters(validPage),
      (response) => {
        state.data = response.data
        state.pagination = response.pagination
      },
    )
  }

  const searchCharacters = async (query: string, page: number = 1) => {
    const trimmedQuery = query.trim()
    if (!trimmedQuery) {
      return fetchCharacters(page)
    }

    const validPage = Math.max(1, Math.floor(page))
    searchQuery.value = trimmedQuery

    return handleApiCall(
      () => apiService.searchCharacters(trimmedQuery, validPage),
      (response) => {
        state.data = response.data
        state.pagination = response.pagination
      },
    )
  }

  const getCharacterById = async (id: number): Promise<Character | null> => {
    if (!id || id <= 0) {
      return null
    }

    try {
      return await apiService.getCharacterById(id)
    } catch (error) {
      return null
    }
  }

  const changePage = (page: number) => {
    const validPage = Math.max(1, Math.floor(page))

    if (searchQuery.value.trim()) {
      searchCharacters(searchQuery.value, validPage)
    } else {
      fetchCharacters(validPage)
    }
  }

  const retry = () => {
    const currentPage = state.pagination.page

    if (searchQuery.value.trim()) {
      searchCharacters(searchQuery.value, currentPage)
    } else {
      fetchCharacters(currentPage)
    }
  }

  const cleanup = () => {
    if (currentController) {
      currentController.abort()
      currentController = null
    }
  }

  return {
    state,
    searchQuery,
    fetchCharacters,
    searchCharacters,
    getCharacterById,
    changePage,
    retry,
    cleanup,
  }
}
