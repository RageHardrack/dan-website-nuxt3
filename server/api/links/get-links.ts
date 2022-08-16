import { createError, defineHandle } from "h3";
import { LinkService } from "~~/services";

export default defineHandle(async (_req) => {
  try {
    const linksPages = await LinkService.findAll();

    return { linksPages };
  } catch (error) {
    console.error(error);
    createError({
      statusCode: 500,
      message: "No se pudo obtener el contenido de la Publicación",
    });
  }
});
