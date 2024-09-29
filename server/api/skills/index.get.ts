
export default defineEventHandler(async (event) => {
  try {
    const portfolioDatabases = await PortfolioService.findAllChildDatabases();
    const skillId = portfolioDatabases.find(
      (page) => page.title === "Skills"
    )!.id;

    const skills = await PortfolioService.findSkills(skillId);

    return skills;
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
