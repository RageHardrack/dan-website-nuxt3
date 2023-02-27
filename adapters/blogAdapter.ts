import {
  IPost,
  IPostProperties,
  PostNotionResponse,
  PostNotionResponseProperties,
  Tag,
} from "~~/interfaces";

export const postPropertiesAdapter = (
  properties: PostNotionResponseProperties
): IPostProperties => ({
    Tags: properties.Tags.multi_select.map((tag: Tag) => tag.name),
    Image_URL: properties.Image_URL.url,
    Status: properties.Status.select.name,
    Slug: properties.Slug.rich_text[0].plain_text,
    Fecha_Publicacion: properties.Fecha_Publicacion.date.start,
    Brief: properties.Brief.rich_text[0].plain_text,
    Post: properties.Post.title[0].plain_text,
    Prevent_Index: properties.Prevent_Index.checkbox,
    Language: properties.Language.select.name,
    Stage: properties.Stage.relation[0].id,
});

export const postAdapter = (results: PostNotionResponse[]): IPost[] =>
  results.map((post) => ({
    id: post.id,
    ...postPropertiesAdapter(post.properties),
  }));
