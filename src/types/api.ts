// API Response types
export interface ApiResponse<T> {
  data: T[]
  pagination: {
    page: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

// Character types
export interface Character {
  id: number
  name: string
  image: string
  occupation: string[]
  description?: string
  age?: number
  birthdate?: string
  gender?: string
  phrases?: string[]
  status?: string
  firstAppearance?: string
  voicedBy?: string[]
  relatives?: Relative[]
}

export interface Relative {
  name: string
  relationship: string
}

// Episode types
export interface Episode {
  id: number
  title: string
  description: string
  image: string
  season: number
  episode: number
  airDate: string
  director: string
  writer: string[]
}

// API Error type
export interface ApiError {
  message: string
  status: number
}

// Search filters
export interface SearchFilters {
  query?: string
  page?: number
  season?: number
}

// Composable return types
export interface ApiState<T> {
  data: T[]
  loading: boolean
  error: ApiError | null
  pagination: {
    page: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}
