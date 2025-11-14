import { ref, reactive } from 'vue'
import type { Episode, ApiState, ApiError } from '@/types/api'
import apiService from '@/services/apiService'

export function useEpisodes() {
  const state = reactive<ApiState<Episode>>({
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

  const fetchEpisodes = async (page: number = 1) => {
    state.loading = true
    state.error = null

    try {
      const response = await apiService.getEpisodes(page)
      state.data = response.data
      state.pagination = response.pagination
    } catch (error) {
      state.error = error as ApiError
      state.data = []
    } finally {
      state.loading = false
    }
  }

  const searchEpisodes = async (query: string, page: number = 1) => {
    state.loading = true
    state.error = null
    searchQuery.value = query

    try {
      const response = await apiService.searchEpisodes(query, page)
      state.data = response.data
      state.pagination = response.pagination
    } catch (error) {
      state.error = error as ApiError
      state.data = []
    } finally {
      state.loading = false
    }
  }

  const getEpisodeById = async (id: number): Promise<Episode | null> => {
    try {
      return await apiService.getEpisodeById(id)
    } catch (error) {
      console.error('Failed to fetch episode:', error)
      return null
    }
  }

  const changePage = (page: number) => {
    if (searchQuery.value.trim()) {
      searchEpisodes(searchQuery.value, page)
    } else {
      fetchEpisodes(page)
    }
  }

  const retry = () => {
    if (searchQuery.value.trim()) {
      searchEpisodes(searchQuery.value, state.pagination.page)
    } else {
      fetchEpisodes(state.pagination.page)
    }
  }

  return {
    state,
    searchQuery,
    fetchEpisodes,
    searchEpisodes,
    getEpisodeById,
    changePage,
    retry,
  }
}
