<template>
  <article
    class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-yellow-500/10 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1"
    :class="{ 'animate-pulse': loading }"
  >
    <!-- Image Container -->
    <div
      class="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden"
    >
      <!-- Actual Image -->
      <div v-if="!loading" class="relative h-full w-full">
        <img
          :src="imageUrl"
          :alt="title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          @error="onImageError"
          @load="onImageLoad"
          loading="lazy"
        />

        <!-- Gradient Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>

        <!-- Featured Badge -->
        <div
          v-if="featured"
          class="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-simpsons-yellow-400 to-simpsons-orange-400 text-gray-900 text-xs font-bold rounded-full shadow-lg"
        >
          ⭐ Destacado
        </div>

        <!-- Category Badge -->
        <div
          v-if="category"
          class="absolute top-3 right-3 px-2 py-1 bg-black/50 text-white text-xs font-medium rounded-full backdrop-blur-sm"
        >
          {{ category }}
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 space-y-3">
      <!-- Title -->
      <div class="space-y-2">
        <h3
          class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-simpsons-blue-600 dark:group-hover:text-simpsons-yellow-400 transition-colors duration-200 line-clamp-1"
        >
          {{ title }}
        </h3>

        <!-- Subtitle -->
        <p
          v-if="subtitle"
          class="text-sm font-medium text-simpsons-blue-600 dark:text-simpsons-blue-400"
        >
          {{ subtitle }}
        </p>
      </div>

      <!-- Description -->
      <div
        v-if="description"
        class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed"
      >
        {{ description }}
      </div>

      <!-- Tags -->
      <div v-if="tags && tags.length" class="flex flex-wrap gap-2">
        <span
          v-for="(tag, index) in visibleTags"
          :key="index"
          class="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full transition-colors duration-200"
          :class="getTagClasses(index)"
        >
          {{ tag }}
        </span>
        <button
          v-if="hasMoreTags"
          @click.stop="showAllTags = !showAllTags"
          class="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          {{ showAllTags ? 'Menos' : `+${remainingTagsCount}` }}
        </button>
      </div>

      <!-- Stats Row -->
      <div
        v-if="$slots.stats"
        class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700"
      >
        <slot name="stats"></slot>
      </div>

      <!-- Footer -->
      <div v-if="$slots.footer" class="pt-3 border-t border-gray-100 dark:border-gray-700">
        <slot name="footer"></slot>
      </div>

      <!-- Actions -->
      <div v-if="$slots.actions" class="flex items-center justify-between pt-3">
        <slot name="actions"></slot>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="absolute inset-0 bg-white/80 dark:bg-gray-800/80 flex items-center justify-center backdrop-blur-sm"
    >
      <div class="text-center">
        <div
          class="w-8 h-8 border-3 border-gray-300 border-t-simpsons-blue-500 rounded-full animate-spin mx-auto mb-2"
        ></div>
        <p class="text-sm text-gray-600 dark:text-gray-400">Cargando...</p>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  title: string
  subtitle?: string
  description?: string
  imageUrl: string
  tags?: string[]
  loading?: boolean
  featured?: boolean
  category?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  featured: false,
})

const showAllTags = ref(false)
const maxVisibleTags = 3

// Computed properties
const visibleTags = computed(() => {
  if (!props.tags) return []
  return showAllTags.value ? props.tags : props.tags.slice(0, maxVisibleTags)
})

const hasMoreTags = computed(() => {
  return props.tags && props.tags.length > maxVisibleTags
})

const remainingTagsCount = computed(() => {
  if (!props.tags) return 0
  return Math.max(0, props.tags.length - maxVisibleTags)
})

// Methods
const onImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/placeholder.jpg' // Fallback image
}

const onImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.classList.add('animate-fade-in')
}

const getTagClasses = (index: number) => {
  const colors = [
    'bg-simpsons-blue-100 text-simpsons-blue-800 dark:bg-simpsons-blue-900/30 dark:text-simpsons-blue-300',
    'bg-simpsons-yellow-100 text-simpsons-yellow-800 dark:bg-simpsons-yellow-900/30 dark:text-simpsons-yellow-300',
    'bg-simpsons-green-100 text-simpsons-green-800 dark:bg-simpsons-green-900/30 dark:text-simpsons-green-300',
    'bg-simpsons-orange-100 text-simpsons-orange-800 dark:bg-simpsons-orange-900/30 dark:text-simpsons-orange-300',
    'bg-simpsons-red-100 text-simpsons-red-800 dark:bg-simpsons-red-900/30 dark:text-simpsons-red-300',
  ]
  return colors[index % colors.length]
}
</script>

<style scoped>
/* Animation for image load */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

/* Line clamp utilities */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom border width */
.border-3 {
  border-width: 3px;
}
</style>
