<template>
  <div
    class="flex flex-col items-center justify-center py-12"
    :class="containerClass"
    role="status"
    aria-live="polite"
    :aria-label="message"
  >
    <div class="relative" aria-hidden="true">
      <!-- Main Spinner -->
      <div class="w-12 h-12 border-4 rounded-full animate-spin" :class="spinnerClasses"></div>

      <!-- Inner Donut -->
      <div
        class="absolute inset-2 w-8 h-8 border-2 border-simpsons-yellow-400 rounded-full animate-spin-slow opacity-60"
      ></div>

      <!-- Center Dot -->
      <div
        class="absolute inset-1/2 w-2 h-2 bg-gradient-to-r from-simpsons-blue-500 to-simpsons-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
      ></div>
    </div>

    <!-- Message -->
    <div class="mt-4 text-center">
      <p class="text-gray-700 dark:text-gray-300 font-medium">
        {{ message }}
      </p>
      <div v-if="showProgress" class="mt-2">
        <div class="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-simpsons-blue-500 to-simpsons-green-500 rounded-full animate-pulse transition-all duration-300"
            :style="{ width: `${normalizedProgress}%` }"
          ></div>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ normalizedProgress }}%</p>
      </div>
    </div>

    <!-- Optional Dots Animation -->
    <div v-if="showDots" class="flex space-x-1 mt-2">
      <div
        v-for="i in 3"
        :key="i"
        class="w-2 h-2 bg-simpsons-blue-500 rounded-full animate-bounce"
        :style="{ animationDelay: `${(i - 1) * 0.15}s` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'simple'
  showProgress?: boolean
  progress?: number
  showDots?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  message: 'Cargando...',
  size: 'md',
  variant: 'primary',
  showProgress: false,
  progress: 0,
  showDots: false,
})

// Variant configurations
const variantConfig = {
  primary:
    'border-gray-200 dark:border-gray-700 border-t-simpsons-blue-500 border-r-simpsons-green-500',
  secondary:
    'border-gray-200 dark:border-gray-700 border-t-simpsons-yellow-500 border-r-simpsons-orange-500',
  simple: 'border-gray-300 dark:border-gray-600 border-t-simpsons-blue-500',
}

const sizeConfig = {
  sm: 'py-6',
  md: 'py-12',
  lg: 'py-16',
}

const containerClass = computed(() => sizeConfig[props.size])
const spinnerClasses = computed(() => variantConfig[props.variant])

// Validate and clamp progress between 0-100
const normalizedProgress = computed(() => Math.max(0, Math.min(100, props.progress)))
</script>

<style scoped>
/* Custom spin animations */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 2s linear infinite;
}

/* Bounce animation with delay */
.animate-bounce {
  animation: bounce 1.4s infinite;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
