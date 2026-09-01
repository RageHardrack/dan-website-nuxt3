# Lascar Blog & Portal Web

Portal web público y plataforma de portafolio/blog personal del ecosistema **Lascar**, desarrollado en **Nuxt 4**. Actúa como capa de presentación frontend desacoplada que consume los endpoints REST expuestos por el backend **Guilliman**.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Propósito |
|---|---|---|
| **Framework** | [Nuxt 4](https://nuxt.com/) (Vue 3 SSR) | Renderizado del lado del servidor y generación híbrida |
| **Estilos** | [Tailwind CSS](https://tailwindcss.com/) | Diseño visual modular y utilitario |
| **Estado** | [Pinia](https://pinia.vuejs.org/) | Gestión de estado reactivo y tipado |
| **Cliente HTTP** | `$fetch` (Ofetch) | Consumo de la API REST de Guilliman (`/api/v1`) |
| **Gestor de Paquetes** | [Bun](https://bun.sh/) | Instalación de dependencias y scripts de ejecución |
| **Proxy Local** | [Portless](https://github.com/antfu-collective/portless) | Dominio local en puerto no privilegiado (1355) |

---

## 🚀 Inicio Rápido (Desarrollo Local)

### 1. Instalación de dependencias
```bash
bun install
```

### 2. Configurar variables de entorno
Crea el archivo `.env` a partir del ejemplo:
```bash
cp .env.example .env
```

| Variable | Descripción | Valor por Defecto |
|---|---|---|
| `API_BASE_URL` | URL base del backend Guilliman | `http://localhost:3000/api/v1` |

### 3. Ejecutar servidor de desarrollo
El comando de desarrollo utiliza **Portless** en modo HTTP sin privilegios (puerto 1355):
```bash
bun run dev
```

### 4. Compilar para producción
```bash
bun run build
```

---

## 🐳 Ejecución con Docker

El servicio se despliega dentro de la red compartida `lascar-network` utilizando la imagen precompilada de GHCR:

```bash
# Desde la raíz del workspace Lascar
docker compose up -d blog
```

Variables requeridas en el `.env` raíz para el contenedor:
- `BLOG_DOMINIO`: Dominio virtual para `nginx-proxy` y `acme-companion` (ej. `dan-colmenares.com`).
- `API_DOMINIO`: Dominio de la API para configurar `API_BASE_URL` en tiempo de ejecución.

