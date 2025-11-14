import { ref, watch, onMounted, onUnmounted, readonly } from 'vue'

// Estado reactivo compartido para el tema
const isDark = ref(false)

export function useDarkMode() {
  // Helper para manejar localStorage de forma segura
  const getStoredTheme = (): string | null => {
    try {
      return localStorage.getItem('theme')
    } catch {
      return null
    }
  }

  const setStoredTheme = (theme: string): void => {
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Silent fail si localStorage no está disponible
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  const setTheme = (dark: boolean) => {
    isDark.value = dark
  }

  const initTheme = () => {
    // Verificar el tema guardado en localStorage
    const savedTheme = getStoredTheme()

    // Verificar la preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    // Determinar el tema inicial
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      isDark.value = prefersDark
    }

    updateDOM()
  }

  const updateDOM = () => {
    const html = document.documentElement

    if (isDark.value) {
      html.classList.add('dark')
      setStoredTheme('dark')
    } else {
      html.classList.remove('dark')
      setStoredTheme('light')
    }
  }

  // Escuchar cambios en el tema
  watch(isDark, updateDOM, { immediate: false })

  // Escuchar cambios en la preferencia del sistema
  const watchSystemPreference = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = getStoredTheme()
      // Solo actualizar si no hay tema guardado
      if (!savedTheme) {
        isDark.value = e.matches
      }
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }

  onMounted(() => {
    const cleanup = watchSystemPreference()
    // Retornar una función que puede ejecutar cleanup si es necesario
    onUnmounted(() => {
      cleanup()
    })
  })

  return {
    isDark: readonly(isDark),
    toggleTheme,
    setTheme,
    initTheme,
  }
}

// Export para uso directo del estado
export { isDark }
