import { sendError, createError, defineHandle } from "h3";
import { BlogService } from "~~/services";

export default defineHandle(async (req, res) => {
  try {
    const slug = req.url.substring(1) as string;

    const pages = await BlogService.findAll();

    const current = pages.find(
      (r: any) => r.properties.Slug["rich_text"][0]["plain_text"] == slug
    );

    if (!current) {
      return sendError(
        res,
        createError({
          statusCode: 404,
          message: "No se pudo obtener el contenido de la Publicación",
        })
      );
    }

    const { properties, id: pageId } = await BlogService.findOne(current.id);

    const content = await BlogService.getPostContent(pageId);

    return { properties, content };
  } catch (error) {
    console.error(error);
    sendError(
      res,createError({
      statusCode: 500,
      message: "No se pudo obtener el contenido de la Publicación",
    }));
  }
});
