import type { ApiResponse, Character, Episode, ApiError } from '@/types/api'

const BASE_URL = 'https://thesimpsonsapi.com/api'
const CDN_URL = 'https://cdn.thesimpsonsapi.com'

class ApiService {
  private async request<T>(endpoint: string, currentPage: number = 1): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const apiData = await response.json()

      // The Simpsons API returns data in 'results' field with pagination info
      let data = apiData.results || apiData || []
      const count = apiData.count || data.length || 0
      const pages = apiData.pages || 1

      // Transform data to match our interface
      if (Array.isArray(data) && data.length > 0) {
        if (data[0].portrait_path) {
          data = data.map((character: any) => ({
            ...character,
            image: character.portrait_path || character.image,
            occupation: character.occupation ? [character.occupation] : [],
            age: character.age,
            birthdate: character.birthdate,
            gender: character.gender,
            phrases: character.phrases || [],
            status: character.status,
          }))
        } else if (data[0].image_path) {
          data = data.map((episode: any) => ({
            ...episode,
            image: episode.image_path || episode.image,
            title: episode.name || episode.title,
            airDate: episode.airdate || episode.airDate,
            episode: episode.episode_number || episode.episode,
          }))
        }
      }

      // Transform the API response to match our expected format
      return {
        data: data,
        pagination: {
          page: currentPage,
          totalPages: pages,
          totalItems: count,
          itemsPerPage: 20,
        },
      }
    } catch (error) {
      throw {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 500,
      } as ApiError
    }
  }

  // Characters endpoints
  async getCharacters(page: number = 1): Promise<ApiResponse<Character>> {
    const endpoint = page > 1 ? `/characters?page=${page}` : '/characters'
    return this.request<Character>(endpoint, page)
  }

  async getCharacterById(id: number): Promise<Character> {
    try {
      const response = await fetch(`${BASE_URL}/characters/${id}`)
      if (!response.ok) {
        throw new Error(`Character not found`)
      }
      const character = await response.json()

      // Transform to match our interface
      return {
        ...character,
        image: character.portrait_path || character.image,
        occupation: character.occupation ? [character.occupation] : [],
        age: character.age,
        birthdate: character.birthdate,
        gender: character.gender,
        phrases: character.phrases || [],
        status: character.status,
      }
    } catch (error) {
      throw {
        message: error instanceof Error ? error.message : 'Failed to fetch character',
        status: 404,
      } as ApiError
    }
  }

  // Episodes endpoints
  async getEpisodes(page: number = 1): Promise<ApiResponse<Episode>> {
    const endpoint = page > 1 ? `/episodes?page=${page}` : '/episodes'
    return this.request<Episode>(endpoint, page)
  }

  async getEpisodeById(id: number): Promise<Episode> {
    try {
      const response = await fetch(`${BASE_URL}/episodes/${id}`)
      if (!response.ok) {
        throw new Error(`Episode not found`)
      }
      const episode = await response.json()

      // Transform to match our interface
      return {
        ...episode,
        image: episode.image_path || episode.image,
        title: episode.name || episode.title,
        airDate: episode.airdate || episode.airDate,
        episode: episode.episode_number || episode.episode,
      }
    } catch (error) {
      throw {
        message: error instanceof Error ? error.message : 'Failed to fetch episode',
        status: 404,
      } as ApiError
    }
  }

  getImageUrl(imagePath: string, size: number = 200): string {
    if (!imagePath) {
      return '/placeholder.jpg'
    }

    if (imagePath.startsWith('https://cdn.thesimpsonsapi.com')) {
      return imagePath
    }

    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
    const constructedUrl = `${CDN_URL}/${size}/${cleanPath}`
    return constructedUrl
  }

  // Search methods
  async searchCharacters(query: string, page: number = 1): Promise<ApiResponse<Character>> {
    const allCharacters = await this.getCharacters(page)

    if (!query.trim()) {
      return allCharacters
    }

    const filtered = allCharacters.data.filter(
      (character) =>
        character.name.toLowerCase().includes(query.toLowerCase()) ||
        character.occupation.some((job) => job.toLowerCase().includes(query.toLowerCase())),
    )

    return {
      data: filtered,
      pagination: {
        ...allCharacters.pagination,
        totalItems: filtered.length,
      },
    }
  }

  async searchEpisodes(query: string, page: number = 1): Promise<ApiResponse<Episode>> {
    const allEpisodes = await this.getEpisodes(page)

    if (!query.trim()) {
      return allEpisodes
    }

    const filtered = allEpisodes.data.filter(
      (episode) =>
        episode.title.toLowerCase().includes(query.toLowerCase()) ||
        episode.description.toLowerCase().includes(query.toLowerCase()),
    )

    return {
      data: filtered,
      pagination: {
        ...allEpisodes.pagination,
        totalItems: filtered.length,
      },
    }
  }
}

export const apiService = new ApiService()
export default apiService
