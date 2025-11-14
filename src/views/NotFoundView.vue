<template>
  <div
    class="min-h-screen bg-gradient-to-br from-simpsons-yellow-50 via-white to-simpsons-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden"
  >
    <!-- Background floating elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="floating-donut">🍩</div>
      <div class="floating-beer">🍺</div>
      <div class="floating-tv">📺</div>
      <div class="floating-nuclear">☢️</div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-6 pt-8 sm:pt-4 text-center">
      <!-- 404 Illustration with Animation -->
      <div class="mb-12 mt-8 sm:mt-4 animate-bounce-slow">
        <div class="relative inline-block">
          <div
            class="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black text-transparent bg-gradient-to-r from-simpsons-yellow-500 to-simpsons-orange-500 bg-clip-text drop-shadow-2xl"
          >
            404
          </div>
          <div
            class="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 text-2xl sm:text-4xl md:text-5xl animate-pulse"
          >
            😵
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div class="max-w-2xl mx-auto mb-12">
        <h1
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-6 animate-fade-in-up"
        >
          ¡Página No Encontrada!
        </h1>
        <p
          class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in-up"
        >
          Parece que te has perdido en el Sector 7-G de la Planta Nuclear de Springfield. ¡Esta
          página no existe en nuestro universo!
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
          <router-link
            to="/"
            class="group bg-gradient-to-r from-simpsons-blue-500 to-simpsons-blue-600 hover:from-simpsons-blue-600 hover:to-simpsons-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
          >
            <span class="text-2xl">🏠</span>
            <span>Ir al Inicio</span>
            <svg
              class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </router-link>

          <button
            @click="goBack"
            class="group bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-simpsons-yellow-400 dark:hover:border-simpsons-yellow-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
          >
            <svg
              class="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span>Regresar</span>
          </button>
        </div>
      </div>

      <!-- Navigation Suggestions -->
      <div class="mt-16 max-w-3xl mx-auto">
        <p class="text-gray-500 dark:text-gray-400 mb-6 text-lg">
          ¿Qué tal si exploras estas secciones?
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <router-link
            to="/characters"
            class="group p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 hover:border-simpsons-yellow-400 dark:hover:border-simpsons-yellow-500 transition-all duration-300 transform hover:scale-105"
          >
            <div class="text-3xl mb-2 group-hover:animate-bounce">👥</div>
            <div class="font-semibold text-gray-800 dark:text-white">Personajes</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Conoce a los habitantes</div>
          </router-link>

          <router-link
            to="/episodes"
            class="group p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 hover:border-simpsons-yellow-400 dark:hover:border-simpsons-yellow-500 transition-all duration-300 transform hover:scale-105"
          >
            <div class="text-3xl mb-2 group-hover:animate-bounce">📺</div>
            <div class="font-semibold text-gray-800 dark:text-white">Episodios</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Descubre historias épicas</div>
          </router-link>

          <div
            class="group p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 opacity-75 cursor-not-allowed sm:col-span-2 lg:col-span-1"
          >
            <div class="text-3xl mb-2">🏢</div>
            <div class="font-semibold text-gray-800 dark:text-white">Ubicaciones</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Próximamente...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

// Trigger animation on mount
onMounted(() => {
  document.documentElement.style.setProperty('--animate-delay', '0s')
})
</script>

<style scoped>
@keyframes bounce-slow {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-8px);
  }
}

/* Mobile-specific bounce animation */
@media (max-width: 640px) {
  @keyframes bounce-slow {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 3s infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.floating-donut,
.floating-beer,
.floating-tv,
.floating-nuclear {
  position: absolute;
  animation: float 6s ease-in-out infinite;
  font-size: 2rem;
  opacity: 0.3;
  pointer-events: none;
}

.floating-donut {
  top: 15%;
  left: 10%;
  animation-delay: 0s;
}

.floating-beer {
  top: 25%;
  right: 15%;
  animation-delay: 1.5s;
}

.floating-tv {
  bottom: 30%;
  left: 20%;
  animation-delay: 3s;
}

.floating-nuclear {
  bottom: 20%;
  right: 25%;
  animation-delay: 4.5s;
}

/* Dark mode specific adjustments */
@media (prefers-color-scheme: dark) {
  .floating-donut,
  .floating-beer,
  .floating-tv,
  .floating-nuclear {
    opacity: 0.2;
  }
}

/* Responsive improvements */
@media (max-width: 640px) {
  .floating-donut,
  .floating-beer,
  .floating-tv,
  .floating-nuclear {
    font-size: 1.5rem;
  }
}

/* Custom gradient background utilities */
.bg-gradient-to-br {
  background: linear-gradient(135deg, var(--tw-gradient-stops));
}

/* Enhanced shadows */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}
</style>
