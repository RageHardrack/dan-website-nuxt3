import { createError, defineHandle, useQuery } from "h3";
import blogServices from "~~/utils/BlogServices";

export default defineHandle(async (req) => {
  try {
    const { slug } = useQuery(req);

    const pages = await blogServices.fetchBlogDatabase();

    const current = pages.find(
      (r: any) => r.properties.Slug["rich_text"][0]["plain_text"] == slug
    );

    if (!current) {
      createError({
        statusCode: 404,
        message: "No se pudo obtener el contenido de la Publicación",
      });
    }

    const { properties, id: pageId } = await blogServices.fetchPostById(
      current.id
    );

    const content = await blogServices.fetchPostContent(pageId);

    return { properties, content };
  } catch (error) {
    console.log(error);
    createError({
      statusCode: 500,
      message: "No se pudo obtener el contenido de la Publicación",
    });
  }
});
