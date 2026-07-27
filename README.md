# Lascar Blog & Personal Web Portal

**Lascar Blog** es la plataforma web pública de contenido y portafolio personal, que consume y renderiza contenido dinámico utilizando Notion API como CMS headless.

---

## 🛠️ Stack Tecnológico

- **Framework**: [Nuxt 4 / Nuxt v3](https://nuxt.com/) (SSR / Hybrid Rendering)
- **CMS Headless**: [Notion API Client (`@notionhq/client`)](https://www.npmjs.com/package/@notionhq/client)
- **Estilos**: [TailwindCSS](https://tailwindcss.com/)
- **Iconos & Animaciones**: `@morev/vue-transitions`, `nuxt-icon`
- **Estado**: [Pinia](https://pinia.vuejs.org/)
- **Package Manager**: [Bun](https://bun.sh/)
- **Runtime Producción**: Bun (`.output/server/index.mjs`)

---

## 🚀 Inicio Rápido (Desarrollo Local)

### 1. Instalación de dependencias
```bash
bun install
```

### 2. Configurar Variables de Entorno
Copia el archivo `.env.example` a `.env` y asigna tus credenciales de Notion:
```bash
cp .env.example .env
```

Variables clave:
- `NOTION_API_KEY`: Token de integración de Notion.
- `NOTION_BLOG_ID`: ID de la base de datos de publicaciones.
- `NOTION_HOME_ID`, `NOTION_ABOUT_ID`, `NOTION_PORTFOLIO_ID`: IDs de páginas/bases de datos en Notion.

### 3. Ejecutar servidor de desarrollo
```bash
bun run dev
```

### 4. Compilar para producción
```bash
bun run build
```

---

## 🐳 Ejecución con Docker

Para construir y levantar el sitio mediante Docker:
```bash
# Desde la raíz del workspace Lascar
docker compose up -d blog
```
