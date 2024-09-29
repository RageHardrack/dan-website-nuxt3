
export default defineEventHandler(async (event) => {
  try {
    const content = await AboutService.getAboutContent();

    return { content };
  } catch (error: any) {
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
