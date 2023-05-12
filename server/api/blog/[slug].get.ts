import { sendError, createError } from "h3";
import { IPost } from "~~/interfaces";
import { BlogService } from "~~/services";

export default defineEventHandler(async (event) => {
  try {
    const slug = event.context?.params?.slug as string;

    const pages = await BlogService.findAll();

    const current = pages.find((page: IPost) => page.Slug == slug);

    if (!current) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          message: "No se pudo obtener el contenido de la Publicación",
        })
      );
    }

    const pageContent = await BlogService.findOne(current.id);

    const content = await BlogService.getPostContent(pageContent.id);

    return { ...pageContent, content };
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
