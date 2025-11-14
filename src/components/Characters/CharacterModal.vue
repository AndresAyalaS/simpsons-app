<template>
  <!-- Modal Overlay -->
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    @click="closeModal"
  >
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-2xl font-bold text-gray-800">{{ character.name }}</h2>
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Character Image -->
          <div class="space-y-4">
            <img
              :src="getCharacterImageUrl(character.image)"
              :alt="character.name"
              class="w-full rounded-lg shadow-lg"
              @error="onImageError"
            />

            <!-- Quick Stats -->
            <div class="bg-gray-50 rounded-lg p-4 space-y-2">
              <div v-if="character.age" class="flex justify-between">
                <span class="font-medium text-gray-700">Edad:</span>
                <span class="text-gray-600">{{ character.age }} años</span>
              </div>
              <div v-if="character.birthdate" class="flex justify-between">
                <span class="font-medium text-gray-700">Fecha de nacimiento:</span>
                <span class="text-gray-600">{{ formatDate(character.birthdate) }}</span>
              </div>
              <div v-if="character.gender" class="flex justify-between">
                <span class="font-medium text-gray-700">Género:</span>
                <span class="text-gray-600">{{ translateGender(character.gender) }}</span>
              </div>
              <div v-if="character.status" class="flex justify-between">
                <span class="font-medium text-gray-700">Estado:</span>
                <span class="text-gray-600 flex items-center">
                  <span
                    :class="{
                      'w-2 h-2 rounded-full mr-2': true,
                      'bg-green-500': character.status === 'Alive',
                      'bg-red-500': character.status === 'Dead',
                      'bg-yellow-500': character.status === 'Unknown',
                    }"
                  ></span>
                  {{ translateStatus(character.status) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Character Details -->
          <div class="space-y-4">
            <!-- Description -->
            <div v-if="character.description">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p class="text-gray-600 leading-relaxed">{{ character.description }}</p>
            </div>

            <!-- Occupation -->
            <div v-if="character.occupation && character.occupation.length">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Ocupación</h3>
              <div class="text-gray-600">
                {{ character.occupation.join(', ') }}
              </div>
            </div>

            <!-- Phrases -->
            <div v-if="character.phrases && character.phrases.length">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Frases Características</h3>
              <div class="bg-simpsons-yellow bg-opacity-20 rounded-lg p-4 max-h-80 overflow-y-auto">
                <ul class="space-y-2">
                  <li
                    v-for="phrase in character.phrases"
                    :key="phrase"
                    class="text-gray-700 italic text-sm flex items-start"
                  >
                    <span class="text-simpsons-blue mr-2 text-lg leading-none">"</span>
                    <span>{{ phrase }}</span>
                    <span class="text-simpsons-blue ml-1 text-lg leading-none">"</span>
                  </li>
                </ul>
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
import type { Character } from '@/types/api'
import apiService from '@/services/apiService'

interface Props {
  character: Character
}

defineProps<Props>()

defineEmits<{
  close: []
}>()

const closeModal = () => {}

const getCharacterImageUrl = (imagePath: string) => {
  return apiService.getImageUrl(imagePath, 200)
}

const onImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/placeholder.jpg'
}

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

const translateGender = (gender: string) => {
  switch (gender.toLowerCase()) {
    case 'male':
      return 'Hombre'
    case 'female':
      return 'Mujer'
    default:
      return gender
  }
}

const translateStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case 'alive':
      return 'Activo'
    case 'dead':
      return 'Fallecido'
    case 'unknown':
      return 'Desconocido'
    default:
      return status
  }
}
</script>
