<template>
  <div
    class="rounded-2xl p-8 text-center transition-all duration-300 animate-fade-in"
    :class="containerClasses"
  >
    <!-- Icon Container -->
    <div class="mb-6">
      <div
        class="w-20 h-20 mx-auto rounded-full flex items-center justify-center animate-bounce-light"
        :class="iconContainerClasses"
      >
        <!-- Error Icon -->
        <svg
          v-if="variant === 'error'"
          class="w-10 h-10"
          :class="iconClasses"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>

        <!-- Warning Icon -->
        <svg
          v-else-if="variant === 'warning'"
          class="w-10 h-10"
          :class="iconClasses"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <!-- Network Icon -->
        <svg
          v-else-if="variant === 'network'"
          class="w-10 h-10"
          :class="iconClasses"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
          />
        </svg>

        <!-- Not Found Icon -->
        <svg
          v-else
          class="w-10 h-10"
          :class="iconClasses"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>

    <!-- Title -->
    <h3 class="text-2xl font-bold mb-3 font-heading" :class="titleClasses">
      {{ title }}
    </h3>

    <!-- Message -->
    <div class="max-w-md mx-auto mb-6 space-y-2">
      <p class="text-base leading-relaxed" :class="messageClasses">
        {{ message }}
      </p>

      <!-- Additional Details -->
      <p v-if="details" class="text-sm opacity-75" :class="messageClasses">
        {{ details }}
      </p>
    </div>

    <!-- Actions -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
      <!-- Retry Button -->
      <button
        v-if="showRetry"
        @click="handleRetry"
        :disabled="retrying"
        class="btn-primary min-w-[120px] relative overflow-hidden"
        :class="retryButtonClasses"
      >
        <span v-if="!retrying" class="flex items-center space-x-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            ></path>
          </svg>
          <span>{{ retryText }}</span>
        </span>
        <span v-else class="flex items-center space-x-2">
          <div
            class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
          ></div>
          <span>{{ retryingText }}</span>
        </span>
      </button>

      <!-- Secondary Action -->
      <button
        v-if="$slots.action || showHome"
        @click="handleSecondaryAction"
        class="btn-outline min-w-[120px]"
        :class="secondaryButtonClasses"
      >
        <slot name="action">
          <span class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            <span>Ir al inicio</span>
          </span>
        </slot>
      </button>
    </div>

    <!-- Help Text -->
    <p v-if="helpText" class="mt-4 text-xs opacity-60" :class="messageClasses">
      {{ helpText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  title?: string
  message: string
  details?: string
  variant?: 'error' | 'warning' | 'network' | 'notFound'
  showRetry?: boolean
  showHome?: boolean
  retryText?: string
  retryingText?: string
  helpText?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Algo salió mal',
  variant: 'error',
  showRetry: true,
  showHome: false,
  retryText: 'Intentar de nuevo',
  retryingText: 'Reintentando...',
})

const emit = defineEmits<{
  retry: []
  secondaryAction: []
}>()

const router = useRouter()
const retrying = ref(false)

// Variant configurations
const variantConfig = {
  error: {
    container: 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800',
    iconContainer: 'bg-red-100 dark:bg-red-800/30',
    icon: 'text-red-600 dark:text-red-400',
    title: 'text-red-800 dark:text-red-300',
    message: 'text-red-700 dark:text-red-400',
    retryButton: 'from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:ring-red-500',
    secondaryButton:
      'border-red-300 text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20',
  },
  warning: {
    container: 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800',
    iconContainer: 'bg-yellow-100 dark:bg-yellow-800/30',
    icon: 'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-800 dark:text-yellow-300',
    message: 'text-yellow-700 dark:text-yellow-400',
    retryButton:
      'from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 focus:ring-yellow-500',
    secondaryButton:
      'border-yellow-300 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-600 dark:text-yellow-400 dark:hover:bg-yellow-900/20',
  },
  network: {
    container: 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800',
    iconContainer: 'bg-blue-100 dark:bg-blue-800/30',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-800 dark:text-blue-300',
    message: 'text-blue-700 dark:text-blue-400',
    retryButton:
      'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500',
    secondaryButton:
      'border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20',
  },
  notFound: {
    container: 'bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700',
    iconContainer: 'bg-gray-100 dark:bg-gray-700',
    icon: 'text-gray-600 dark:text-gray-400',
    title: 'text-gray-800 dark:text-gray-300',
    message: 'text-gray-700 dark:text-gray-400',
    retryButton:
      'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 focus:ring-gray-500',
    secondaryButton:
      'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800/20',
  },
}

// Computed classes
const containerClasses = computed(() => variantConfig[props.variant].container)
const iconContainerClasses = computed(() => variantConfig[props.variant].iconContainer)
const iconClasses = computed(() => variantConfig[props.variant].icon)
const titleClasses = computed(() => variantConfig[props.variant].title)
const messageClasses = computed(() => variantConfig[props.variant].message)
const retryButtonClasses = computed(
  () => `bg-gradient-to-r ${variantConfig[props.variant].retryButton}`,
)
const secondaryButtonClasses = computed(() => variantConfig[props.variant].secondaryButton)

// Methods
const handleRetry = async () => {
  retrying.value = true
  try {
    emit('retry')
    // Small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))
  } finally {
    retrying.value = false
  }
}

const handleSecondaryAction = () => {
  if (props.showHome) {
    router.push('/')
  } else {
    emit('secondaryAction')
  }
}
</script>

<style scoped>
/* Animation classes */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce-light {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

.animate-bounce-light {
  animation: bounce-light 2s ease-in-out infinite;
}
</style>
