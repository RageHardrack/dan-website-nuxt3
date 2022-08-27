import { createError, sendError } from "h3";
import { BlogService } from "~~/services";

export default defineEventHandler(async (event) => {
  try {
    const pages = await BlogService.findAll();

    const promises = pages.map((page) => BlogService.findOne(page.id));

    const posts = await Promise.all(promises);

    return { posts };
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
