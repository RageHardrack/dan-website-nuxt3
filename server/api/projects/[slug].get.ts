import { PortfolioService } from "~~/services";

export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, "slug");

    const portfolioDatabases = await PortfolioService.findAllChildDatabases();

    const projectsDatabaseId = portfolioDatabases.find(
      (page) => page.title === "Projects"
    )!.id;

    const projectsDatabase = await PortfolioService.findProjects(
      projectsDatabaseId
    );

    const findProjectId = projectsDatabase.find(
      (pro) => pro.properties.Slug == slug
    )!.id;

    if (!findProjectId) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          message: "Project not found!",
        })
      );
    }

    const content = await PortfolioService.getProjectContent(findProjectId);

    return { content };
  } catch (error) {
    console.error(error);
    sendError(
      event,
      createError({
        statusCode: 500,
        message: "No se pudo obtener el contenido del Proyecto",
      })
    );
  }
});
