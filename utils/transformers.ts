import type {
  Tag,
  RawProjectProperties,
  IProjectProperties,
  RawSkillProperties,
  ISkillProperties,
  RawExperienceProperties,
  IExperienceProperties,
} from "~~/interfaces";

export class PropertiesTransformer {
  static GetProjectProperties = (
    projectProperties: RawProjectProperties
  ): IProjectProperties => {
    return {
      Name: projectProperties.Name.title[0].plain_text,
      Slug: projectProperties.Slug.rich_text[0].plain_text,
      Tags: projectProperties.Tags.multi_select.map((tag: Tag) => tag.name),
      Repository: projectProperties.Repository?.url,
      Preview: projectProperties.Preview.url,
      Language: projectProperties.Language.select.name,
      Orden: projectProperties.Orden.number,
    };
  };

  static GetSkillProperties = (
    skillProperties: RawSkillProperties
  ): ISkillProperties => {
    return {
      Name: skillProperties.Name.title[0].plain_text,
      Image_URL: skillProperties.Image_URL.url,
      Orden: skillProperties.Orden.number,
    };
  };

  static GetExperienceProperties = (
    xpProperties: RawExperienceProperties
  ): IExperienceProperties => {
    return {
      Work: xpProperties.Work.title[0].plain_text,
      Stack: xpProperties.Stack.multi_select.map((tag: Tag) => tag.name),
      Orden: xpProperties.Orden.number,
      Period: xpProperties.Period.rich_text[0].plain_text,
      Description: xpProperties.Description.rich_text[0].plain_text,
    };
  };
}
