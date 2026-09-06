# Lascar Blog & Portal Web

Portal web público y plataforma de portafolio/blog personal del ecosistema **Lascar**, desarrollado en **Nuxt 4** (Vue 3 SSR). Actúa como capa de presentación frontend desacoplada que consume los endpoints REST expuestos por el backend **Guilliman** con tolerancia a fallos y resiliencia integrada.

---

## ⚡ Quick Path (Desarrollo Local)

Para iniciar el entorno local rápidamente:

1. **Instalar dependencias**:

   ```bash
   bun install
   ```

2. **Configurar entorno**:

   ```bash
   cp .env.example .env
   ```

3. **Iniciar servidor de desarrollo (Portless puerto 1355)**:

   ```bash
   bun run dev
   # o alternativamente:
   bun run dev:http
   ```

4. **Verificar en el navegador**:
   Abrir `http://localhost:1355` o el dominio asignado por Portless.

---

## 🛠️ Stack Tecnológico

| Capa                | Tecnología                                               | Versión / Detalle              | Propósito                                                                 |
| ------------------- | -------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------- |
| **Framework**       | [Nuxt 4](https://nuxt.com/)                              | `^4.5.2` (Vue 3.5 SSR)         | Renderizado híbrido (SSR / Client) y enrutamiento por convenciones        |
| **Estilos**         | [Tailwind CSS](https://tailwindcss.com/)                 | `^6.14.0`                      | Sistema modular de utilidades visuales responsive                         |
| **Estado**          | [Pinia](https://pinia.vuejs.org/)                        | `^3.0.4` (`@pinia/nuxt`)       | Gestión reactiva de estado global de interfaz                             |
| **Cliente HTTP**    | `$fetch` (Ofetch)                                        | Nativo de Nuxt                 | Consumo resiliente de la API REST de Guilliman                            |
| **Package Manager** | [Bun](https://bun.sh/)                                   | `v1.4+`                        | Instalación ultra-rápida y ejecución de scripts                           |
| **Proxy Local**     | [Portless](https://github.com/antfu-collective/portless) | Puerto `1355` (HTTP)           | Binding de desarrollo sin requerir permisos root ni puertos privilegiados |
| **Testing**         | [Vitest](https://vitest.dev/)                            | `^4.1.11` + `@nuxt/test-utils` | Pruebas unitarias de componentes, páginas y resiliencia de fetch          |

---

## 🛡️ Resiliencia y Manejo de Errores

El portal implementa una arquitectura defensiva de dos capas contra caídas o errores 500 del backend Guilliman:

- **Defensive Fetch Handlers (`app/utils/fetch-handlers.ts`)**: Todas las peticiones HTTP (`fetchAboutPage`, `fetchBlogPage`, `fetchPortfolioPage`, `fetchLinksPage`) capturan excepciones de red y respuestas 5xx, devolviendo estructuras tipadas con `{ hasError: true, ...defaults }`.
- **Inline Error State (`app/components/ErrorMessage.vue`)**: Las vistas (`/about`, `/blog`, `/portfolio`) muestran una tarjeta de alerta no fatal con botón de reintento (`@retry="refresh"`), manteniendo la barra de navegación (`Navbar`) y el pie de página (`Footer`) completamente interactivos.

---

## 🐳 Ejecución con Docker

El servicio se despliega dentro de la red compartida `lascar-network` utilizando la imagen precompilada de GHCR:

```bash
# Desde la raíz del workspace Lascar
docker compose up -d blog
```

### Variables de Entorno de Producción

En el archivo `.env` de la raíz del monorepo Lascar:

| Variable       | Propósito                                                               | Ejemplo               |
| -------------- | ----------------------------------------------------------------------- | --------------------- |
| `BLOG_DOMINIO` | Dominio virtual para `nginx-proxy` y `acme-companion`                   | `dan-colmenares.com`  |
| `API_DOMINIO`  | Dominio de la API para configurar `API_BASE_URL` en tiempo de ejecución | `api.dragon-azul.dev` |

---

## 🧪 Pruebas y Verificación

| Comando                  | Descripción                                                   |
| ------------------------ | ------------------------------------------------------------- |
| `bun run test`           | Ejecuta la suite completa de pruebas unitarias con Vitest     |
| `bun run test:watch`     | Modo interactivo continuo para desarrollo TDD                 |
| `bun run test:coverage`  | Genera reporte de cobertura de código (`@vitest/coverage-v8`) |
| `bun x vue-tsc --noEmit` | Verificación estricta de tipos TypeScript y templates Vue     |
| `bun run format`         | Aplica formateo consistente con Prettier                      |

---

## ✅ Checklist de Verificación

- [ ] Las dependencias se instalan limpiamente con `bun install`.
- [ ] La navegación a `/about`, `/blog` y `/portfolio` muestra `ErrorMessage` con opción de reintento en caídas del API.
- [ ] La suite de pruebas de Vitest pasa al 100% (`bun run test`).
- [ ] El chequeo de tipos no reporta errores (`bun x vue-tsc --noEmit`).
