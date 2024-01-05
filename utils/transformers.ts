import type {
  Tag,
  RawProjectProperties,
  IProjectProperties,
  RawSkillProperties,
  ISkillProperties,
  ContentBlock,
} from "~~/interfaces";

export const projectPropertiesTransformer = (
  projectProperties: RawProjectProperties
): IProjectProperties => {
  return {
    Name: projectProperties.Name.title[0].plain_text,
    Slug: projectProperties.Slug.rich_text[0].plain_text,
    Tags: projectProperties.Tags.multi_select.map((tag: Tag) => tag.name),
    Repository: projectProperties.Repository?.url,
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
