import { BlogService } from "~~/services";
import { createError, defineHandle, sendError } from "h3";

export default defineHandle(async (_req, res) => {
  try {
    const pages = await BlogService.findAll();

    const promises = pages.map((page) => BlogService.findOne(page.id));

    const posts = await Promise.all(promises);

    return { posts };
  } catch (error) {
    console.error(error);
    sendError(
      res,
      createError({
        statusCode: 500,
        message: error.message,
      })
    );
  }
});
