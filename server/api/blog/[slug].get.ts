import { sendError, createError } from "h3";
import { IPost } from "~~/interfaces";
import { BlogService } from "~~/services";

export default defineEventHandler(async (event) => {
  try {
    const slug = event.context.params.slug as string;

    console.log({ slug });

    const pages = await BlogService.findAll();

    const current = pages.find((page: IPost) => page.properties.Slug == slug);

    if (!current) {
      return sendError(
        event,
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
      event,
      createError({
        statusCode: 500,
        message: "No se pudo obtener el contenido de la Publicación",
      })
    );
  }
});
