# 🍩 The Simpsons Explorer

Una aplicación web moderna construida con Vue.js 3 para explorar el universo de Los Simpson.

## 🌟 Características Principales

### ✅ Requerimientos Cumplidos

- **✅ Framework Vue.js 3**: Implementado con Composition API y TypeScript
- **✅ TypeScript**: Tipado estático completo para mejor desarrollo
- **✅ Consumo de API REST**: Integración con The Simpsons API
- **✅ Búsqueda y Filtrado**: Búsqueda en tiempo real por nombre
- **✅ Paginación**: Navegación eficiente por grandes cantidades de datos
- **✅ Vista de Detalle**: Modales interactivos con información completa
- **✅ Vue Router**: Navegación SPA con rutas dinámicas y SEO optimizado
- **✅ Testing**: Tests unitarios completos con Vitest (45 tests)
- **✅ Framework CSS**: Tailwind CSS con tema personalizado de Los Simpson
- **✅ Diseño Responsive**: Optimizado para móvil, tablet y desktop

### 🚀 Características Adicionales (Bonus)

- **🌙 Dark Mode**: Tema oscuro con persistencia automática y transiciones suaves
- **📱 Diseño Responsive Avanzado**: Mobile-first con adaptación perfecta a cualquier dispositivo
- **🎨 Sistema de Diseño Moderno**: Paleta de colores temática y componentes consistentes
- **⚡ Optimizaciones de Performance**: Lazy loading, componentes optimizados, código minimizado
- **🔄 Estados de Carga**: Spinners y skeletons personalizados con animaciones
- **❌ Manejo de Errores**: Sistema robusto de manejo de errores con recuperación
- **📊 Análitica Visual**: Estadísticas y datos interesantes de la serie
- **🎭 Página 404 Moderna**: Diseño actualizado con animaciones y navegación intuitiva
- **🎨 UI Consistente**: Paginación uniforme entre todas las vistas

## 🛠️ Stack Tecnológico

### Core Framework

- **Vue.js 3.4.29**: Framework progresivo con Composition API
- **TypeScript 5.4.0**: Superset de JavaScript con tipado estático
- **Vite 5.3.1**: Build tool moderno y ultrarrápido

### Desarrollo y Build

- **@vitejs/plugin-vue**: Plugin oficial de Vue para Vite
- **vue-tsc**: Verificador de tipos TypeScript para Vue
- **npm**: Gestor de paquetes (v10.9.0 o superior)

### Routing y Estado

- **Vue Router 4.3.3**: Enrutamiento oficial de Vue con TypeScript
- **Composables**: Manejo de estado reactivo con Composition API

### Estilos y UI

- **Tailwind CSS 3.4.18**: Framework CSS utility-first
- **@tailwindcss/typography**: Plugin para tipografía mejorada
- **PostCSS 8.4.38**: Procesador CSS
- **Autoprefixer 10.4.19**: Auto-prefijos CSS para compatibilidad

### Testing y Calidad

- **Vitest 1.6.0**: Framework de testing ultrarrápido (45 tests ✅)
- **@vue/test-utils**: Utilidades oficiales para testing de Vue
- **jsdom**: Entorno DOM para testing
- **@types/jsdom**: Tipos TypeScript para jsdom

### Desarrollo

- **ESLint**: Linter para JavaScript/TypeScript
- **Prettier**: Formateador de código
- **@types/node**: Tipos TypeScript para Node.js

### API y Datos

- **The Simpsons API**: API REST pública (thesimpsonsapi.com)
- **Fetch API**: Cliente HTTP nativo del navegador
- **Error Handling**: Sistema robusto de manejo de errores

### Características del Build

- **Tree Shaking**: Eliminación automática de código no utilizado
- **Code Splitting**: División automática del código por rutas
- **Hot Module Replacement (HMR)**: Recarga en caliente durante desarrollo
- **Minificación**: Código optimizado para producción

## 🚀 Instalación y Configuración

### 📋 Prerrequisitos del Sistema

Asegúrate de tener instaladas las siguientes herramientas en tu sistema:

- **Node.js**: Versión 18.0.0 o superior (recomendado: 20.19.0)
- **npm**: Versión 9.0.0 o superior (incluido con Node.js)
- **Git**: Para clonar el repositorio

#### Verificar Versiones Instaladas

```bash
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar Git
git --version
```

### 🔧 Paso a Paso para Ejecutar en Local

#### 1. **Clonar el Repositorio**

```bash
# Clonar usando HTTPS
git clone https://github.com/AndresAyalaS/simpsons-app

# Navegar al directorio del proyecto
cd simpsons-app
```

#### 2. **Instalar Dependencias**

```bash
# Instalar todas las dependencias del proyecto
npm install

# Esto instalará automáticamente:
# - Vue.js 3.4.29
# - TypeScript 5.4.0
# - Vite 5.3.1
# - Tailwind CSS 3.4.18
# - Vue Router 4.3.3
# - Vitest 1.6.0
# - Y todas las dependencias adicionales
```

#### 3. **Iniciar el Servidor de Desarrollo**

```bash
# Ejecutar en modo desarrollo
npm run dev

# El servidor estará disponible en:
# 🌐 http://localhost:5173
```

#### 4. **Verificar que Todo Funciona**

```bash
# En una nueva terminal, ejecutar los tests
npm run test:unit

# Verificar que los 45 tests pasen correctamente
# ✅ All tests should pass

# Verificar el build de producción
npm run build

# Previsualizar el build
npm run preview
```

### 🌐 Acceder a la Aplicación

Una vez que el servidor de desarrollo esté ejecutándose:

1. **Abrir navegador**: Ve a `http://localhost:5173`
2. **Explorar la app**: Navega por las diferentes secciones
3. **Probar funcionalidades**: Búsqueda, paginación, dark mode, responsive design

## 📋 Scripts Disponibles

| Comando                    | Descripción                              | Uso Recomendado         |
| -------------------------- | ---------------------------------------- | ----------------------- |
| `npm run dev`              | Inicia el servidor de desarrollo con HMR | Desarrollo diario       |
| `npm run build`            | Construye la aplicación para producción  | Deploy y verificación   |
| `npm run preview`          | Previsualiza la build de producción      | Testing pre-deploy      |
| `npm run test:unit`        | Ejecuta los 45 tests unitarios           | Verificación de calidad |
| `npm run test:unit:watch`  | Ejecuta tests en modo watch              | Desarrollo con TDD      |
| `npm run type-check`       | Verifica los tipos TypeScript            | Validación de tipos     |
| `npm run type-check:watch` | Verifica tipos en modo watch             | Desarrollo con tipos    |
| `npm run lint`             | Ejecuta ESLint para verificar código     | Control de calidad      |
| `npm run format`           | Formatea el código con Prettier          | Antes de commits        |

### 🔍 Scripts Detallados

#### Desarrollo

```bash
# Desarrollo normal con hot reload
npm run dev

# Desarrollo con verificación de tipos en tiempo real
npm run dev & npm run type-check:watch
```

#### Testing y Calidad

```bash
# Ejecutar todos los tests (45 tests)
npm run test:unit

# Tests en modo watch para desarrollo
npm run test:unit:watch

# Tests con coverage report
npm run test:unit -- --coverage

# Verificar tipos y linting
npm run type-check && npm run lint
```

#### Build y Deploy

```bash
# Build completo con verificaciones
npm run type-check && npm run test:unit && npm run build

# Previsualizar antes del deploy
npm run preview

# Build optimizado para producción
npm run build
```

### Tipos de Tests Implementados

1. **Unit Tests**: Componentes individuales aislados
2. **Integration Tests**: Interacción entre componentes
3. **API Tests**: Servicios y llamadas a API
4. **UI Tests**: Comportamiento de interfaz de usuario
5. **Responsive Tests**: Funcionalidad en diferentes viewports

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Characters/      # Componentes específicos de personajes
│   ├── Episodes/        # Componentes específicos de episodios
│   ├── Layout/          # Componentes de layout
│   └── UI/             # Componentes UI base
├── composables/         # Lógica reutilizable de Vue
├── router/             # Configuración de Vue Router
├── services/           # Servicios para API y lógica externa
├── stores/             # Stores de Pinia
├── types/              # Definiciones de tipos TypeScript
└── views/              # Componentes de páginas/vistas
```

## 🎨 Sistema de Diseño

### Paleta de Colores

- **Amarillo Simpson**: `#FED100` - Color principal icónico
- **Azul Simpson**: `#00A8E1` - Color secundario para acciones
- **Naranja Simpson**: `#FF8C00` - Color de acento
- **Verde Simpson**: `#32CD32` - Color de éxito
- **Rojo Simpson**: `#DC143C` - Color de error

### Tipografía

- **Heading**: Poppins (títulos y encabezados)
- **Body**: Inter (texto general y contenido)
- **Mono**: JetBrains Mono (código y datos técnicos)

### Breakpoints Responsive

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🌐 API Endpoints Utilizados

### The Simpsons API

```javascript
// Base URL
https://thesimpsonsapi.com/api/

// Endpoints principales
GET /characters?page={page}     // Lista de personajes
GET /episodes?page={page}       // Lista de episodios

// Imágenes optimizadas
GET https://cdn.thesimpsonsapi.com/{size}/{path}
```

### Características de la API

- ✅ Paginación automática
- ✅ Búsqueda por nombre
- ✅ Filtros avanzados
- ✅ Imágenes optimizadas
- ✅ Rate limiting respetado

## 🎯 Funcionalidades Detalladas

### Página Principal (HomeView)

- Hero section con animaciones
- Tarjetas de navegación interactivas
- Estadísticas de la serie
- Datos curiosos y trivia
- Call-to-actions prominentes

### Vista de Personajes

- **Búsqueda en tiempo real**: Filtrado instantáneo por nombre
- **Vista adaptativa**: Tabla en desktop, cards en móvil
- **Paginación**: Navegación eficiente por páginas
- **Modales de detalle**: Información completa de cada personaje
- **Imágenes optimizadas**: Carga lazy y fallbacks

### Vista de Episodios

- **Lista completa**: Todos los episodios por temporada
- **Información detallada**: Fecha de emisión, descripción, temporada
- **Navegación por temporadas**: Filtros y organización
- **Vista responsive**: Adaptada a cualquier dispositivo

### Página 404 (NotFoundView)

- **Diseño moderno**: Gradientes y animaciones suaves
- **Tema consistente**: Paleta de colores de Los Simpson
- **Elementos flotantes**: Íconos temáticos animados (🍩🍺📺☢️)
- **Responsive optimizado**: Animaciones adaptadas para móvil
- **Navegación intuitiva**: Botones de acción y sugerencias
- **Dark mode**: Soporte completo para tema oscuro
- **Microinteracciones**: Hover effects y transiciones

## 🔧 Decisiones Técnicas

### Vue 3 + Composition API

**¿Por qué?**: Mayor flexibilidad, mejor reutilización de código, mejor soporte para TypeScript.

### Tailwind CSS

**¿Por qué?**: Desarrollo rápido, diseño consistente, bundle size optimizado, dark mode integrado.

### TypeScript

**¿Por qué?**: Mejor developer experience, detección temprana de errores, mejor autocompletado.

## 🌟 Características Destacadas

### Dark Mode Inteligente

- **Auto-detección**: Respeta la preferencia del sistema
- **Persistencia**: Recuerda la elección del usuario
- **Transiciones**: Cambios suaves entre temas
- **Cobertura completa**: Todos los componentes soportan dark mode

### Performance Optimizada

- **Lazy Loading**: Carga diferida de imágenes
- **Code Splitting**: División automática del código
- **Tree Shaking**: Eliminación de código no utilizado
- **Minimized Bundle**: Tamaño optimizado para producción

### UX/UI Moderna

- **Microanimaciones**: Feedback visual en interacciones
- **Estados de carga**: Spinners y skeletons personalizados
- **Manejo de errores**: Mensajes claros y opciones de recuperación
- **Navegación intuitiva**: Breadcrumbs y indicadores visuales

## 📱 Responsive Design

### Estrategia Mobile-First

- Diseño inicial para móviles
- Progressive enhancement para pantallas más grandes
- Touch-friendly interactions
- Optimización para gestos y navegación táctil

### Breakpoints Adaptativos

- **xs**: < 640px (móviles pequeños)
- **sm**: 640px+ (móviles grandes)
- **md**: 768px+ (tablets)
- **lg**: 1024px+ (laptops)
- **xl**: 1280px+ (desktops)

## 🔒 Mejores Prácticas Implementadas

### Desarrollo

- ✅ Estructura modular y escalable
- ✅ Componentes reutilizables
- ✅ Separación de responsabilidades
- ✅ Código autodocumentado
- ✅ Convenciones de naming consistentes

### Performance

- ✅ Lazy loading de componentes e imágenes
- ✅ Optimización de bundle size
- ✅ Minimización de re-renders
- ✅ Gestión eficiente del estado
