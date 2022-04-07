import { createError, defineHandle } from "h3";
import { linkServices } from "~~/utils";

export default defineHandle(async (req) => {
  try {
    const linksPages = await linkServices.fetchLinksDatabase();

    return { linksPages };
  } catch (error) {
    console.error(error);
    createError({
      statusCode: 500,
      message: "No se pudo obtener el contenido de la Publicación",
    });
  }
});
