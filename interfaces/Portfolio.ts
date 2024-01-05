import type { ContentBlock } from "./ContentBlock";
import type {
  MultiSelectProperty,
  NumberProperty,
  Parent,
  RichTextProperty,
  SelectProperty,
  TedBy,
  TitleProperty,
  UrlProperty,
} from "./Share";

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
  Slug: RichTextProperty;
  Tags: MultiSelectProperty;
  Repository?: UrlProperty;
  Preview: UrlProperty;
  Language: SelectProperty;
  Orden: NumberProperty;
}

export interface IProjectProperties {
  Name: string;
  Slug: string;
  Tags: string[];
  Repository?: string;
  Preview: string;
  Language: string;
  Orden: number;
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

export interface PortfolioPageApiResponse {
  content: ContentBlock[];
  projects: IProject[];
  skills: ISkill[];
}

export interface ProjectPageApiResponse {
  content: ContentBlock[];
}
