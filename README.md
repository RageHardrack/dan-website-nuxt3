# Daniel Colmenares' personal Portfolio/Blog

## Stack

- [Nuxt v3](https://nuxt.com/)
- [TailwindCSS (Nuxt 3 Module)](https://nuxt.com/modules/tailwindcss)
- [Notion Client v1 as CMS](https://www.npmjs.com/package/@notionhq/client)
- [DayJS (Nuxt 3 Module)](https://nuxt.com/modules/dayjs)
- [@morev/Vue-transitions (Nuxt 3 Module)](https://nuxt.com/modules/vue-transitions)
- [Nuxt Icon (Nuxt 3 Module)](https://nuxt.com/modules/icon)
- [Pinia](https://pinia.vuejs.org/)

## TODO List

- [ ] Complete Home page.
- [ ] Check for correct types in Page Content Blocks.
- [ ] Auto fetch list of Tags for Skills and Projects.
- [ ] Add Nuxt/Image Module.
- [ ] Improve SSR experience.
- [ ] Add additional functionality and info to Experience Cards.
- [ ] Add i18n.
- [ ] Improve SEO.

## Setup

### Environment Variables

| Name                  | Description                                                                                                                  | Required |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------- |
| `NOTION_API_KEY`      | Api Key to connect Notion and use it as Content Manager                                                                      | YES      |
| `APP_ENVIRONMENT`     | Set the environment as dev by default only to access to "dev" content and test it in local                                   | NO       |
| `NOTION_HOME_ID`      | Notion's DB ID for the parent page "HOME"                                                                                    | YES      |
| `NOTION_ABOUT_ID`     | Notion's DB ID for the parent page "ABOUT ME"                                                                                | YES      |
| `NOTION_BLOG_ID`      | Notion's DB ID for the parent page "BLOG"                                                                                    | YES      |
| `NOTION_PORTFOLIO_ID` | Notion's DB ID for the parent page "PORTFOLIO"                                                                               | YES      |
| `NOTION_LINK_TREE_ID` | Notion's DB ID for the parent page "LINK TREE"                                                                               | YES      |
| `DEVELOPMENT_STAGE`   | Notion's ID for enum "DEVELOPMENT". Using to determine which of my content in my personal Notion is set to development stage | NO       |
| `PRODUCTION_STAGE`    | Notion's ID for enum "PRODUCTION". Using to determine which of my content in my personal Notion is set to production stage   | YES      |

### Install dependencies

Make sure to install the dependencies using `pnpm`

```bash
pnpm install
```

### Development Server

Start the development server on [localhost](http://localhost:3000)

```bash
pnpm dev
```

### Build to Production

Build the application for production:

```bash
pnpm build
```

### Build Docker Image

_Please note this is a help for myself to easily build up the docker image. If you want to reply it, change `hardrack` and the name of the repo, to your fork and personal Docker Hub user._

```bash
docker build -t hardrack/dragon-azul-nuxt3-website:tag .
```
