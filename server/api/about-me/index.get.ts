import { createError, sendError } from "h3";
import { AboutService } from "~~/services";

export default defineEventHandler(async (event) => {
  try {
    const aboutContent = await AboutService.getAboutContent();

    return { aboutContent };
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
