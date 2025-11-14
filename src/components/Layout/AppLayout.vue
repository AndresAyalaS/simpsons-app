<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex flex-col"
  >
    <!-- Navigation Header -->
    <nav
      class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-lg"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo/Brand -->
          <div class="flex items-center space-x-4">
            <router-link to="/" class="flex items-center space-x-3 group">
              <div
                class="w-10 h-10 bg-gradient-to-r from-simpsons-yellow-400 to-simpsons-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
              >
                <span class="text-xl font-bold text-gray-900">🍩</span>
              </div>
              <div class="hidden sm:block">
                <h1
                  class="font-heading text-xl font-bold bg-gradient-to-r from-simpsons-blue-600 to-simpsons-green-500 bg-clip-text text-transparent"
                >
                  The Simpsons
                </h1>
                <p class="text-xs text-gray-500 dark:text-gray-400 -mt-1">Springfield Explorer</p>
              </div>
            </router-link>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center space-x-1">
            <router-link
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="nav-link relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              :class="
                isActiveRoute(link.to)
                  ? 'text-simpsons-blue-600 dark:text-simpsons-blue-400 bg-simpsons-blue-50 dark:bg-simpsons-blue-900/30'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              "
            >
              <span class="flex items-center space-x-2">
                <span class="text-lg">{{ link.icon }}</span>
                <span>{{ link.label }}</span>
              </span>
              <!-- Active indicator -->
              <div
                v-if="isActiveRoute(link.to)"
                class="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-simpsons-blue-500 to-simpsons-green-500 rounded-full"
              ></div>
            </router-link>
          </div>

          <!-- Theme Toggle & Mobile Menu Button -->
          <div class="flex items-center space-x-2">
            <!-- Theme Toggle -->
            <button
              @click="toggleTheme"
              class="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-all duration-200"
              title="Toggle theme"
            >
              <svg
                v-if="isDark"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                ></path>
              </svg>
            </button>

            <!-- Mobile menu button -->
            <button
              @click="toggleMobileMenu"
              class="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-all duration-200"
              :class="{ 'bg-gray-100 dark:bg-gray-800': mobileMenuOpen }"
            >
              <svg
                v-if="!mobileMenuOpen"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="mobileMenuOpen"
          class="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
        >
          <div class="px-4 pt-2 pb-3 space-y-1">
            <router-link
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              @click="closeMobileMenu"
              class="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
              :class="
                isActiveRoute(link.to)
                  ? 'text-simpsons-blue-600 dark:text-simpsons-blue-400 bg-simpsons-blue-50 dark:bg-simpsons-blue-900/30'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              "
            >
              <span class="text-xl">{{ link.icon }}</span>
              <span>{{ link.label }}</span>
            </router-link>
          </div>
        </div>
      </Transition>
    </nav>

    <!-- Main Content -->
    <main class="flex-1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <router-view v-slot="{ Component, route }">
          <Transition
            name="page"
            mode="out-in"
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform translate-y-4 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform translate-y-0 opacity-100"
            leave-to-class="transform -translate-y-4 opacity-0"
          >
            <component :is="Component" :key="route.path" />
          </Transition>
        </router-view>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="text-center">
          <div class="flex items-center justify-center space-x-2 mb-2">
            <span class="text-xl">🍩</span>
            <span
              class="font-heading font-bold text-base bg-gradient-to-r from-simpsons-yellow-600 to-simpsons-orange-500 bg-clip-text text-transparent"
            >
              The Simpsons Explorer
            </span>
          </div>
        </div>
      </div>
    </footer>

    <!-- Scroll to Top Button -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-2 opacity-0 scale-95"
      enter-to-class="transform translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100 scale-100"
      leave-to-class="transform translate-y-2 opacity-0 scale-95"
    >
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-simpsons-blue-500 to-simpsons-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-30 flex items-center justify-center"
        title="Scroll to top"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          ></path>
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDarkMode } from '@/composables/useDarkMode'

const route = useRoute()
const mobileMenuOpen = ref(false)
const showScrollTop = ref(false)

// Use the dark mode composable
const { isDark, toggleTheme, initTheme } = useDarkMode()

// Navigation links
const navLinks = [
  { to: '/characters', label: 'Personajes', icon: '👥' },
  { to: '/episodes', label: 'Episodios', icon: '📺' },
]

// Methods
const isActiveRoute = (path: string): boolean => {
  return route.path === path || route.path.startsWith(path + '/')
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const handleScroll = () => {
  showScrollTop.value = window.pageYOffset > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// Lifecycle
onMounted(() => {
  initTheme()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Custom transitions are handled via Vue Transition component classes */
</style>
