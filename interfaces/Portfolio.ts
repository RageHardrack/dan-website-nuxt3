import type { ContentBlock } from "./ContentBlock";
import type {
  MultiSelectProperty,
  NotionResponse,
  NumberProperty,
  RichTextProperty,
  SelectProperty,
  TitleProperty,
  UrlProperty,
} from "./Share";

export interface ProjectResponse extends NotionResponse {
  properties: RawProjectProperties;
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

export interface SkillResponse extends NotionResponse {
  properties: RawSkillProperties;
}

export interface RawSkillProperties {
  Name: TitleProperty;
  Image_URL: UrlProperty;
  Orden: NumberProperty;
}

export interface ISkill {
  object: string;
  id: string;
  properties: ISkillProperties;
}

export interface ISkillProperties {
  Name: string;
  Image_URL: string;
  Orden: number;
}

export interface PortfolioPageApiResponse {
  content: ContentBlock[];
  projects: IProject[];
}

export interface ProjectPageApiResponse {
  content: ContentBlock[];
}

export interface RawExperienceProperties {
  Work: TitleProperty;
  Stack: MultiSelectProperty;
  Orden: NumberProperty;
  Description: RichTextProperty;
  Period: RichTextProperty;
}

export interface IExperienceProperties {
  Work: string;
  Stack: string[];
  Orden: number;
  Description: string;
  Period: string;
}

export interface ExperienceNotionResponse extends NotionResponse {
  properties: RawExperienceProperties;
}

export interface IExperience {
  object: string;
  id: string;
  properties: IExperienceProperties;
}
