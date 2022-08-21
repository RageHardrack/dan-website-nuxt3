import {
  MultiSelectProperty,
  UrlProperty,
  SelectProperty,
  Parent,
  TedBy,
  TitleProperty,
  RichTextProperty,
  DateProperty,
} from ".";

export interface ProjectResponse {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: TedBy;
  last_edited_by: TedBy;
  cover?: string;
  icon?: string;
  parent: Parent;
  archived: boolean;
  properties: RawProjectProperties;
  url: string;
}

export interface IProject {
  object: string;
  id: string;
  properties: IProjectProperties;
}

export interface RawProjectProperties {
  Name: TitleProperty;
  Tags: MultiSelectProperty;
  Repository?: UrlProperty;
  Preview: UrlProperty;
  Language: SelectProperty;
}

export interface IProjectProperties {
  Name: string;
  Tags: string[];
  Repository?: string;
  Preview: string;
  Language: string;
}

export interface SkillResponse {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: TedBy;
  last_edited_by: TedBy;
  cover?: string;
  icon?: string;
  parent: Parent;
  archived: boolean;
  properties: RawSkillProperties;
  url: string;
}

export interface RawSkillProperties {
  Name: TitleProperty;
  Image_URL: UrlProperty;
}

export interface ISkill {
  object: string;
  id: string;
  properties: ISkillProperties;
}

export interface ISkillProperties {
  Name: string;
  Image_URL: string;
}

export interface ExperienceResponse {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: TedBy;
  last_edited_by: TedBy;
  cover?: string;
  icon?: string;
  parent: Parent;
  archived: boolean;
  properties: RawExperienceProperties;
  url: string;
}

export interface RawExperienceProperties {
  Name: TitleProperty;
  Description: RichTextProperty;
  Start_Date: DateProperty;
  End_Date?: DateProperty;
}

export interface IExperience {
  object: string;
  id: string;
  properties: IExperienceProperties;
}

export interface IExperienceProperties {
  Name: string;
  Description: string;
  Start_Date: string;
  End_Date?: string;
}
