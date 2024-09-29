
export default defineEventHandler(async (event) => {
  try {
    const portfolioDatabases = await PortfolioService.findAllChildDatabases();

    const content = await PortfolioService.getPortfolioContent();

    const projectId = portfolioDatabases.find(
      (page) => page.title === "Projects"
    )!.id;

    const projects = await PortfolioService.findProjects(projectId);

    return { projects, content };
  } catch (error: any) {
    console.error(error);
    sendError(
      event,
      createError({
        statusCode: 500,
        message: error.message,
      })
    );
  }
});
