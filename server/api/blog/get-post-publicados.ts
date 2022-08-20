import { BlogService } from "~~/services";
import { createError, defineHandle } from "h3";

export default defineHandle(async (_req, _res) => {
  try {
    const pages = await BlogService.findAll();

    const promises = pages.map((page) => BlogService.findOne(page.id));

    const posts = await Promise.all(promises);

    return { posts };
  } catch (error) {
    console.error(error);
    createError({
      statusCode: 500,
      message: error.message,
    });
  }
});
