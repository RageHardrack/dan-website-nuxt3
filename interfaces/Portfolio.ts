import {
  MultiSelectProperty,
  UrlProperty,
  SelectProperty,
  Parent,
  TedBy,
  TitleProperty,
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