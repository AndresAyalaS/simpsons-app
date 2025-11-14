import { describe, it, expect, vi, beforeEach } from 'vitest'
import apiService from '@/services/apiService'

// Mock global fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('apiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getCharacters', () => {
    it('fetches characters successfully and transforms data', async () => {
      const mockApiResponse = {
        count: 2,
        pages: 1,
        results: [
          {
            id: 1,
            name: 'Homer Simpson',
            portrait_path: '/character/1.webp',
            occupation: 'Nuclear Plant Worker',
          },
          {
            id: 2,
            name: 'Marge Simpson',
            portrait_path: '/character/2.webp',
            occupation: 'Homemaker',
          },
        ],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })

      const result = await apiService.getCharacters(1)

      expect(mockFetch).toHaveBeenCalledWith('https://thesimpsonsapi.com/api/characters')
      expect(result.data).toHaveLength(2)
      expect(result.data[0]).toMatchObject({
        id: 1,
        name: 'Homer Simpson',
        image: '/character/1.webp',
        occupation: ['Nuclear Plant Worker'],
      })
      expect(result.pagination).toMatchObject({
        page: 1,
        totalPages: 1,
        totalItems: 2,
        itemsPerPage: 20,
      })
    })

    it('handles API errors correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      await expect(apiService.getCharacters()).rejects.toMatchObject({
        message: expect.stringContaining('HTTP error'),
        status: 500,
      })
    })

    it('fetches with page parameter', async () => {
      const mockResponse = {
        count: 0,
        pages: 1,
        results: [],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      await apiService.getCharacters(2)

      expect(mockFetch).toHaveBeenCalledWith('https://thesimpsonsapi.com/api/characters?page=2')
    })
  })

  describe('getEpisodes', () => {
    it('fetches episodes successfully and transforms data', async () => {
      const mockApiResponse = {
        count: 1,
        pages: 1,
        results: [
          {
            id: 1,
            name: 'Simpsons Roasting on an Open Fire',
            season: 1,
            episode_number: 1,
            image_path: '/episode/1.webp',
            airdate: '1989-12-17',
          },
        ],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })

      const result = await apiService.getEpisodes()

      expect(mockFetch).toHaveBeenCalledWith('https://thesimpsonsapi.com/api/episodes')
      expect(result.data).toHaveLength(1)
      expect(result.data[0]).toMatchObject({
        id: 1,
        title: 'Simpsons Roasting on an Open Fire',
        season: 1,
        episode: 1,
        image: '/episode/1.webp',
        airDate: '1989-12-17',
      })
    })
  })

  describe('getImageUrl', () => {
    it('constructs CDN URL correctly', () => {
      const imagePath = '/character/1.webp'
      const result = apiService.getImageUrl(imagePath, 500)

      expect(result).toBe('https://cdn.thesimpsonsapi.com/500/character/1.webp')
    })

    it('returns full URL as-is if already complete', () => {
      const fullUrl = 'https://cdn.thesimpsonsapi.com/500/character/1.webp'
      const result = apiService.getImageUrl(fullUrl)

      expect(result).toBe(fullUrl)
    })

    it('returns placeholder for empty image path', () => {
      const result = apiService.getImageUrl('')

      expect(result).toBe('/placeholder.jpg')
    })
  })

  describe('searchCharacters', () => {
    it('filters characters by name', async () => {
      const mockApiResponse = {
        count: 3,
        pages: 1,
        results: [
          {
            id: 1,
            name: 'Homer Simpson',
            portrait_path: '/character/1.webp',
            occupation: 'Nuclear Plant Worker',
          },
          {
            id: 2,
            name: 'Marge Simpson',
            portrait_path: '/character/2.webp',
            occupation: 'Homemaker',
          },
          {
            id: 3,
            name: 'Bart Simpson',
            portrait_path: '/character/3.webp',
            occupation: 'Student',
          },
        ],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })

      const result = await apiService.searchCharacters('Homer')

      expect(result.data).toHaveLength(1)
      expect(result.data[0]?.name).toBe('Homer Simpson')
    })

    it('filters characters by occupation', async () => {
      const mockApiResponse = {
        count: 3,
        pages: 1,
        results: [
          {
            id: 1,
            name: 'Homer Simpson',
            portrait_path: '/character/1.webp',
            occupation: 'Nuclear Plant Worker',
          },
          {
            id: 2,
            name: 'Marge Simpson',
            portrait_path: '/character/2.webp',
            occupation: 'Homemaker',
          },
          {
            id: 3,
            name: 'Carl Carlson',
            portrait_path: '/character/3.webp',
            occupation: 'Nuclear Plant Worker',
          },
        ],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })

      const result = await apiService.searchCharacters('Nuclear')

      expect(result.data).toHaveLength(2)
    })

    it('returns all characters when query is empty', async () => {
      const mockApiResponse = {
        count: 2,
        pages: 1,
        results: [
          {
            id: 1,
            name: 'Homer Simpson',
            portrait_path: '/character/1.webp',
            occupation: 'Nuclear Plant Worker',
          },
          {
            id: 2,
            name: 'Marge Simpson',
            portrait_path: '/character/2.webp',
            occupation: 'Homemaker',
          },
        ],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })

      const result = await apiService.searchCharacters('')

      expect(result.data).toHaveLength(2)
    })
  })
})
