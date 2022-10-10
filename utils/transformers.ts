import {
  PostResponseProperties,
  IPostProperties,
  Tag,
  RawProjectProperties,
  IProjectProperties,
  RawSkillProperties,
  ISkillProperties,
  ContentBlock,
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
    Slug: projectProperties.Slug.rich_text[0].plain_text,
    Tags: projectProperties.Tags.multi_select.map((tag: Tag) => tag.name),
    Repository: projectProperties.Repository.url,
    Preview: projectProperties.Preview.url,
    Language: projectProperties.Language.select.name,
    Orden: projectProperties.Orden.number
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

export const blockChildrenTransformer = (block: ContentBlock) => {
  return {
    type: block.type,
    body:
      block.type === "image"
        ? block[block.type].file.url
        : block[block.type].rich_text[0].plain_text,
    caption:
      block.type === "image"
        ? block[block.type].caption[0].plain_text
        : block[block.type].rich_text[0].plain_text,
    emoji: block.type === "callout" ? block[block.type].icon.emoji : null,
  };
};
