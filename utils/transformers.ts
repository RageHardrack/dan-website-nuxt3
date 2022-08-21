import {
  PostResponseProperties,
  IPostProperties,
  Tag,
  RawProjectProperties,
  IProjectProperties,
  RawSkillProperties,
  ISkillProperties,
} from "~~/interfaces";

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

export const projectPropertiesTransformer = (
  projectProperties: RawProjectProperties
): IProjectProperties => {
  return {
    Name: projectProperties.Name.title[0].plain_text,
    Tags: projectProperties.Tags.multi_select.map((tag: Tag) => tag.name),
    Repository: projectProperties.Repository.url,
    Preview: projectProperties.Preview.url,
    Language: projectProperties.Language.select.name,
  };
};

export const skillPropertiesTransformer = (
  skillProperties: RawSkillProperties
): ISkillProperties => {
  return {
    Name: skillProperties.Name.title[0].plain_text,
    Image_URL: skillProperties.Image_URL.url,
  };
};
