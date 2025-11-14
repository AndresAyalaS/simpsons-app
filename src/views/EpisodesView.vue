<template>
  <div class="space-y-6">
    <!-- Header and Search -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">📺 Episodios de Los Simpson</h1>
          <p class="text-gray-600 mt-1">Explora décadas de episodios de Los Simpson</p>
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
            placeholder="Buscar episodios..."
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-simpsons-blue focus:border-simpsons-blue"
          />
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <LoadingSpinner v-if="state.loading" message="Cargando episodios..." />

    <!-- Error State -->
    <ErrorMessage v-else-if="state.error" :message="state.error.message" @retry="retry" />

    <!-- No Results -->
    <div v-else-if="!state.loading && state.data.length === 0" class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM6 6v14h12V6H6z"
          ></path>
          <path d="M10 11l4-2v6l-4-2v-2z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No se encontraron episodios</h3>
      <p class="text-gray-500">Intenta ajustar tus términos de búsqueda</p>
    </div>

    <!-- Episodes Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BaseCard
        v-for="episode in state.data"
        :key="episode.id"
        :title="episode.title"
        :subtitle="`Sección ${episode.season}, Episodio ${episode.episode}`"
        :description="episode.description"
        :image-url="getEpisodeImageUrl(episode.image)"
        :tags="[`S${episode.season}E${episode.episode}`]"
        @click="openEpisodeModal(episode)"
      >
        <template #footer>
          <div class="flex items-center justify-between text-xs text-gray-500">
            <span>Fecha de emisión:</span>
            <span>{{ formatDate(episode.airDate) }}</span>
          </div>
        </template>
      </BaseCard>
    </div>

    <!-- Pagination -->
    <Pagination
      v-if="!state.loading && state.data.length > 0"
      :current-page="state.pagination.page"
      :total-pages="state.pagination.totalPages"
      :total-items="state.pagination.totalItems"
      :items-per-page="state.pagination.itemsPerPage"
      @page-change="changePage"
    />

    <!-- Episode Modal -->
    <EpisodeModal v-if="selectedEpisode" :episode="selectedEpisode" @close="closeEpisodeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEpisodes } from '@/composables/useEpisodes'
import BaseCard from '@/components/UI/BaseCard.vue'
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue'
import ErrorMessage from '@/components/UI/ErrorMessage.vue'
import Pagination from '@/components/UI/Pagination.vue'
import EpisodeModal from '@/components/Episodes/EpisodeModal.vue'
import apiService from '@/services/apiService'
import type { Episode } from '@/types/api'

const { state, searchQuery, fetchEpisodes, searchEpisodes, changePage, retry } = useEpisodes()
const selectedEpisode = ref<Episode | null>(null)

// Search functionality
const onSearch = () => {
  if (searchQuery.value.trim()) {
    searchEpisodes(searchQuery.value)
  } else {
    fetchEpisodes()
  }
}

// Episode modal
const openEpisodeModal = (episode: Episode) => {
  selectedEpisode.value = episode
}

const closeEpisodeModal = () => {
  selectedEpisode.value = null
}

const getEpisodeImageUrl = (imagePath: string) => {
  return apiService.getImageUrl(imagePath, 500)
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'Desconocido'
  try {
    return new Date(dateString).toLocaleDateString('es-ES')
  } catch {
    return dateString
  }
}

// Initialize
onMounted(() => {
  fetchEpisodes()
})
</script>
