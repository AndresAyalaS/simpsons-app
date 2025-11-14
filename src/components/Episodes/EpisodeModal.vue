<template>
  <!-- Modal Overlay -->
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    @click="closeModal"
  >
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-2xl font-bold text-gray-800">{{ episode.title }}</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:items-stretch">
          <!-- Episode Image -->
          <div class="flex">
            <img
              :src="getEpisodeImageUrl(episode.image)"
              :alt="episode.title"
              class="w-full rounded-lg shadow-lg object-cover"
              @error="onImageError"
            />
          </div>

          <!-- Episode Details -->
          <div class="flex flex-col justify-between space-y-4">
            <div class="space-y-4">
              <!-- Description -->
              <div v-if="episode.description">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
                <p class="text-gray-600 leading-relaxed">{{ episode.description }}</p>
              </div>

              <!-- Writers -->
              <div v-if="episode.writer && episode.writer.length">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">
                  Escritor{{ episode.writer.length > 1 ? 'es' : '' }}
                </h3>
                <div class="space-y-1">
                  <div v-for="writer in episode.writer" :key="writer" class="text-gray-600">
                    • {{ writer }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Info - Positioned at bottom -->
            <div class="bg-simpsons-yellow bg-opacity-30 rounded-lg p-4">
              <h4 class="font-semibold text-gray-800 mb-2">Información del Episodio</h4>
              <div class="text-sm text-gray-700 space-y-1">
                <p><strong>Temporada:</strong> {{ episode.season }}</p>
                <p><strong>Número de Episodio:</strong> {{ episode.episode }}</p>
                <p v-if="episode.airDate">
                  <strong>Fecha de Emisión:</strong> {{ formatDate(episode.airDate) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="border-t p-6 bg-gray-50">
        <button @click="$emit('close')" class="w-full btn-primary">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Episode } from '@/types/api'
import apiService from '@/services/apiService'

interface Props {
  episode: Episode
}

defineProps<Props>()

defineEmits<{
  close: []
}>()

const closeModal = () => {}

const getEpisodeImageUrl = (imagePath: string) => {
  return apiService.getImageUrl(imagePath, 500)
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'Desconocido'
  try {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

const onImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/placeholder.jpg'
}
</script>
