<template>
  <div class="space-y-6">
    <!-- Header and Search -->
    <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 class="text-4xl font-bold text-simpsons-blue">🏠 Personajes de Los Simpson</h1>
          <p class="text-gray-600 mt-2 text-lg">Conoce a todos los residentes de Springfield</p>
        </div>

        <!-- Search Bar -->
        <div class="relative max-w-md">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              class="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            v-model="searchQuery"
            @input="onSearch"
            type="text"
            placeholder="Buscar personajes..."
            class="block w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-simpsons-blue focus:border-simpsons-blue transition-all duration-200"
          />
        </div>
      </div>

      <!-- Stats -->
      <div v-if="!state.loading && !state.error" class="mt-4 pt-4 border-t border-gray-200">
        <div class="text-sm text-gray-600">
          Mostrando
          <span class="font-semibold text-simpsons-blue">{{ state.data.length }}</span> personaje{{
            state.data.length !== 1 ? 's' : ''
          }}
          {{ searchQuery ? 'encontrados' : 'en total' }}
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="state.loading" class="flex justify-center py-16">
      <LoadingSpinner message="Cargando personajes..." />
    </div>

    <!-- Error State -->
    <div v-else-if="state.error" class="py-12">
      <ErrorMessage :message="state.error.message" @retry="retry" />
    </div>

    <!-- No Results -->
    <div v-else-if="!state.loading && state.data.length === 0" class="text-center py-16">
      <div class="text-6xl mb-6">🔍</div>
      <h3 class="text-2xl font-bold text-gray-700 mb-2">No se encontraron personajes</h3>
      <p class="text-gray-500 text-lg">Intenta con otro término de búsqueda</p>
    </div>

    <!-- Characters Table/Grid -->
    <div v-else class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <!-- Desktop Table View -->
      <div class="hidden lg:block">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-simpsons-yellow to-yellow-400">
              <tr>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider"
                >
                  Avatar
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider"
                >
                  Nombre
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider"
                >
                  Ocupación
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(character, index) in state.data"
                :key="`table-${character.id || character.name}-${index}`"
                class="hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
                @click="openCharacterModal(character)"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="relative">
                    <img
                      :src="getCharacterImageUrl(character.image)"
                      :alt="character.name"
                      :data-original-path="character.image"
                      class="h-16 w-16 rounded-full object-cover border-4 border-simpsons-yellow group-hover:border-simpsons-blue transition-all duration-300 group-hover:scale-110 shadow-lg"
                      @error="handleImageError"
                      loading="lazy"
                    />
                    <div
                      class="absolute -top-1 -right-1 h-5 w-5 bg-simpsons-green rounded-full border-2 border-white shadow opacity-0 group-hover:opacity-100 transition-opacity"
                    ></div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div
                    class="text-lg font-bold text-gray-900 group-hover:text-simpsons-blue transition-colors"
                  >
                    {{ character.name }}
                  </div>
                  <div
                    v-if="character.description"
                    class="text-sm text-gray-600 line-clamp-1 max-w-xs"
                  >
                    {{ character.description }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div
                    v-if="
                      character.occupation &&
                      Array.isArray(character.occupation) &&
                      character.occupation.length > 0
                    "
                    class="text-sm text-gray-700"
                  >
                    {{ character.occupation.slice(0, 3).join(', ') }}
                    <span v-if="character.occupation.length > 3" class="text-gray-500">
                      , +{{ character.occupation.length - 3 }} más
                    </span>
                  </div>
                  <div v-else class="text-sm text-gray-500 italic">Residente de Springfield</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button
                    @click.stop="openCharacterModal(character)"
                    class="btn-primary text-sm px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tablet Grid View (Medium screens) -->
      <div class="hidden md:block lg:hidden">
        <div class="grid md:grid-cols-2 gap-6 p-6">
          <div
            v-for="(character, index) in state.data"
            :key="`tablet-${character.id || character.name}-${index}`"
            class="bg-gray-50 rounded-lg p-4 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-simpsons-yellow"
            @click="openCharacterModal(character)"
          >
            <div class="flex items-start space-x-4">
              <img
                :src="getCharacterImageUrl(character.image)"
                :alt="character.name"
                :data-original-path="character.image"
                class="h-16 w-16 rounded-full object-cover border-3 border-simpsons-yellow"
                @error="handleImageError"
                loading="lazy"
              />
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-bold text-gray-900 mb-1">{{ character.name }}</h3>
                <p
                  v-if="
                    character.occupation &&
                    Array.isArray(character.occupation) &&
                    character.occupation.length > 0
                  "
                  class="text-sm text-gray-600 mb-2"
                >
                  {{ character.occupation.slice(0, 2).join(', ') }}
                  <span v-if="character.occupation.length > 2" class="text-gray-500">
                    , +{{ character.occupation.length - 2 }} más
                  </span>
                </p>
                <p v-if="character.description" class="text-sm text-gray-600 line-clamp-2 mb-3">
                  {{ character.description }}
                </p>
                <button
                  @click.stop="openCharacterModal(character)"
                  class="btn-secondary text-xs px-3 py-1 rounded-md"
                >
                  Ver Más
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Cards View -->
      <div class="md:hidden space-y-4 p-4">
        <div
          v-for="(character, index) in state.data"
          :key="`mobile-${character.id || character.name}-${index}`"
          class="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl cursor-pointer border border-gray-100 hover:border-simpsons-yellow"
          @click="openCharacterModal(character)"
        >
          <div class="flex items-center space-x-4">
            <div class="relative">
              <img
                :src="getCharacterImageUrl(character.image)"
                :alt="character.name"
                :data-original-path="character.image"
                class="h-20 w-20 rounded-full object-cover border-4 border-simpsons-yellow shadow-lg"
                @error="handleImageError"
                loading="lazy"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-xl font-bold text-gray-900 mb-1">{{ character.name }}</h3>
              <p
                v-if="
                  character.occupation &&
                  Array.isArray(character.occupation) &&
                  character.occupation.length > 0
                "
                class="text-sm text-gray-600 mb-2"
              >
                {{ character.occupation.slice(0, 2).join(', ') }}
                <span v-if="character.occupation.length > 2" class="text-gray-500">
                  , +{{ character.occupation.length - 2 }} más
                </span>
              </p>
              <p v-if="character.description" class="text-sm text-gray-600 line-clamp-3 mb-4">
                {{ character.description }}
              </p>
              <button
                @click.stop="openCharacterModal(character)"
                class="btn-primary text-sm px-4 py-2 rounded-lg w-full"
              >
                Ver Detalles Completos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <Pagination
      v-if="!state.loading && state.data.length > 0 && state.pagination.totalPages > 1"
      :current-page="state.pagination.page"
      :total-pages="state.pagination.totalPages"
      :total-items="state.pagination.totalItems"
      :items-per-page="state.pagination.itemsPerPage"
      @page-change="changePage"
    />

    <!-- Character Modal -->
    <CharacterModal
      v-if="selectedCharacter"
      :character="selectedCharacter"
      @close="closeCharacterModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useCharacters } from '@/composables/useCharacters'
import BaseCard from '@/components/UI/BaseCard.vue'
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue'
import ErrorMessage from '@/components/UI/ErrorMessage.vue'
import Pagination from '@/components/UI/Pagination.vue'
import CharacterModal from '@/components/Characters/CharacterModal.vue'
import apiService from '@/services/apiService'
import type { Character } from '@/types/api'

const { state, searchQuery, fetchCharacters, searchCharacters, changePage, retry } = useCharacters()
const selectedCharacter = ref<Character | null>(null)

// Search functionality
const onSearch = () => {
  if (searchQuery.value.trim()) {
    searchCharacters(searchQuery.value)
  } else {
    fetchCharacters()
  }
}

// Character modal
const openCharacterModal = (character: Character) => {
  selectedCharacter.value = character
}

const closeCharacterModal = () => {
  selectedCharacter.value = null
}

const getCharacterImageUrl = (imagePath: string) => {
  if (!imagePath) {
    return 'https://via.placeholder.com/200x200/FED100/000000?text=👤'
  }

  return apiService.getImageUrl(imagePath, 200)
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement

  if (!img.src.includes('placeholder')) {
    const originalPath = img.getAttribute('data-original-path')
    if (originalPath && originalPath.startsWith('http')) {
      img.src = originalPath
      return
    }

    img.src = 'https://via.placeholder.com/300x300/FED100/000000?text=👤'
  }
}

// Initialize
onMounted(() => {
  fetchCharacters()
})
</script>
