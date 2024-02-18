import { PortfolioService } from "~~/services";

export default defineEventHandler(async (event) => {
  try {
    const portfolioDatabases = await PortfolioService.findAllChildDatabases();
    const xpID = portfolioDatabases.find(
      (page) => page.title === "Experience"
    )!.id;

    const experiences = await PortfolioService.findExperience(xpID);

    return experiences;
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
