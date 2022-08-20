import { PostResponseProperties, IPostProperties, Tag } from "~~/interfaces";

export const postPropertiesTransformer = (
  postProperties: PostResponseProperties
): IPostProperties => {
  return {
    Tags: postProperties.Tags.multi_select.map((tag: Tag) => tag.name),
    Image_URL: postProperties.Image_URL.url,
    Status: postProperties.Status.select.name,
    Slug: postProperties.Slug.rich_text[0].plain_text,
    Fecha_Publicacion: postProperties.Fecha_Publicacion.date.start,
    Brief: postProperties.Brief.rich_text[0].plain_text,
    Post: postProperties.Post.title[0].plain_text,
    Prevent_Index: postProperties.Prevent_Index.checkbox,
  };
};
