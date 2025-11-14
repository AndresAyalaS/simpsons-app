import { createRouter, createWebHistory } from 'vue-router'

// Tipado para meta campos del router
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: 'Inicio - Los Simpson',
        description: 'Página principal de la aplicación Los Simpson',
      },
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('@/views/CharactersView.vue'),
      meta: {
        title: 'Personajes - Los Simpson',
        description: 'Explora todos los personajes de la serie Los Simpson',
      },
    },
    {
      path: '/episodes',
      name: 'episodes',
      component: () => import('@/views/EpisodesView.vue'),
      meta: {
        title: 'Episodios - Los Simpson',
        description: 'Descubre todos los episodios de Los Simpson',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        title: '404 - Página No Encontrada',
        description: 'La página que buscas no existe',
      },
    },
  ],
})

// Navigation guard optimizado para títulos y meta tags
router.beforeEach((to) => {
  // Actualizar título de la página
  if (to.meta?.title) {
    document.title = to.meta.title
  }

  // Actualizar meta description para SEO
  if (to.meta?.description) {
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', to.meta.description)
  }
})

export default router
