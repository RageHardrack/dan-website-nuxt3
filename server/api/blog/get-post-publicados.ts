import type { IncomingMessage, ServerResponse } from "http";
import blogServices from "~~/utils/BlogServices";
import { createError, defineHandle } from "h3";

export default defineHandle(
  async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const pages = await blogServices.fetchBlogDatabase();

      const promises = pages.map((page) => {
        return blogServices.fetchPostById(page.id);
      });

      const posts = await Promise.all(promises);

      return { posts };
    } catch (error) {
      console.log(error);
      createError({
        statusCode: 500,
        message: "No se pudieron obtener las publicaciones",
      });
    }
  }
);
