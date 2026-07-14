export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, "slug");

    const portfolioDatabases = await PortfolioService.findAllChildDatabases();

    const projectsGroup = portfolioDatabases.find(
      (page) => page.title === "Projects"
    );

    if (!projectsGroup) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          message: "No se encontró la base de datos de Proyectos",
        })
      );
    }

    const projectsDatabase = await PortfolioService.findProjects(
      projectsGroup.id
    );

    const currentProject = projectsDatabase.find(
      (pro) => pro.properties.Slug === slug
    );

    if (!currentProject) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          message: "Proyecto no encontrado",
        })
      );
    }

    const content = await PortfolioService.getProjectContent(currentProject.id);

    return { project: currentProject, content };
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
