import { createError, sendError } from "h3";
import { PortfolioService } from "~~/services";

export default defineEventHandler(async (event) => {
  try {
    const portfolioDatabases = await PortfolioService.findAllChildDatabases();

    const projectId = portfolioDatabases.find(
      (page) => page.title === "Projects"
    ).id;
    const skillId = portfolioDatabases.find(
      (page) => page.title === "Skills"
    ).id;

    const projects = await PortfolioService.findProjects(projectId);
    const skills = await PortfolioService.findSkills(skillId);

    return { projects, skills };
  } catch (error) {
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
