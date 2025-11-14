<template>
  <div class="space-y-16">
    <!-- Hero Section -->
    <section class="relative text-center py-20 overflow-hidden" role="banner">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true"></div>
      <div
        class="absolute inset-0 bg-gradient-to-br from-simpsons-yellow-100/50 via-white to-simpsons-blue-100/50 dark:from-simpsons-yellow-900/10 dark:via-gray-900 dark:to-simpsons-blue-900/10"
        aria-hidden="true"
      ></div>

      <!-- Floating Elements -->
      <div
        class="floating-element floating-element-1"
        aria-hidden="true"
        role="img"
        aria-label="Donut"
      >
        🍩
      </div>
      <div
        class="floating-element floating-element-2"
        aria-hidden="true"
        role="img"
        aria-label="Beer"
      >
        🍺
      </div>
      <div
        class="floating-element floating-element-3"
        aria-hidden="true"
        role="img"
        aria-label="TV"
      >
        📺
      </div>
      <div
        class="floating-element floating-element-4"
        aria-hidden="true"
        role="img"
        aria-label="House"
      >
        🏠
      </div>

      <div class="relative max-w-7xl mx-auto px-4">
        <div class="animate-fade-in-up">
          <!-- Title -->
          <h1 class="text-5xl sm:text-6xl lg:text-8xl font-heading font-bold mb-8 leading-tight">
            <span class="text-gradient-primary">Bienvenido al</span>
            <br />
            <span class="relative inline-block">
              <span class="text-gradient-secondary">Universo Simpson</span>
              <svg
                class="absolute -bottom-2 left-0 w-full h-4 text-simpsons-yellow-400"
                viewBox="0 0 300 12"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M0,8 Q150,0 300,8 L300,12 L0,12 Z"></path>
              </svg>
            </span>
          </h1>

          <!-- Subtitle -->
          <p
            class="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed"
          >
            Explora personajes icónicos, episodios memorables y lugares emblemáticos de la serie
            animada más querida del mundo
          </p>

          <!-- CTA Buttons -->
          <nav
            class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            role="navigation"
            aria-label="Navegación principal"
          >
            <router-link
              to="/characters"
              class="group btn-primary btn-lg min-w-[200px] relative overflow-hidden"
              aria-label="Ir a la página de personajes"
            >
              <span class="relative z-10 flex items-center space-x-3">
                <span class="text-2xl" role="img" aria-label="Personajes">👥</span>
                <span>Conocer Personajes</span>
                <svg
                  class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </span>
            </router-link>

            <router-link
              to="/episodes"
              class="group btn-secondary btn-lg min-w-[200px] relative overflow-hidden"
              aria-label="Ir a la página de episodios"
            >
              <span class="relative z-10 flex items-center space-x-3">
                <span class="text-2xl" role="img" aria-label="Episodios">📺</span>
                <span>Ver Episodios</span>
                <svg
                  class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </span>
            </router-link>
          </nav>

          <!-- Quick Stats -->
          <section
            class="flex flex-wrap justify-center gap-8 text-center"
            role="region"
            aria-label="Estadísticas de la serie"
          >
            <div class="stat-card">
              <div class="text-2xl mb-2" role="img" aria-label="Episodios">📺</div>
              <div class="text-3xl font-bold text-simpsons-blue-600 dark:text-simpsons-blue-400">
                750+
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Episodios</div>
            </div>
            <div class="stat-card">
              <div class="text-2xl mb-2" role="img" aria-label="Temporadas">📅</div>
              <div
                class="text-3xl font-bold text-simpsons-orange-600 dark:text-simpsons-orange-400"
              >
                35+
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Temporadas</div>
            </div>
            <div class="stat-card">
              <div class="text-2xl mb-2" role="img" aria-label="Personajes">👥</div>
              <div class="text-3xl font-bold text-simpsons-green-600 dark:text-simpsons-green-400">
                800+
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Personajes</div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Simple and clean setup without complex components
</script>

<style scoped>
/* Stats card styling */
.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: scale(1.05);
}

/* Floating elements con animación optimizada */
.floating-element {
  position: absolute;
  animation: bounce 2s infinite;
  will-change: transform;
}

.floating-element-1 {
  top: 2.5rem;
  left: 2.5rem;
  font-size: 2.25rem;
  opacity: 0.7;
}

.floating-element-2 {
  top: 5rem;
  right: 5rem;
  font-size: 1.875rem;
  opacity: 0.6;
  animation-delay: 0.5s;
}

.floating-element-3 {
  bottom: 5rem;
  left: 5rem;
  font-size: 1.875rem;
  opacity: 0.5;
  animation-delay: 1s;
}

.floating-element-4 {
  bottom: 2.5rem;
  right: 2.5rem;
  font-size: 2.25rem;
  opacity: 0.6;
  animation-delay: 1.5s;
}

/* Optimización para animaciones */
@media (prefers-reduced-motion: reduce) {
  .floating-element {
    animation: none;
  }

  .stat-card {
    transition: none;
  }
}
</style>
