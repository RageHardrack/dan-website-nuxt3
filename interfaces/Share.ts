export type Tag = {
  id: string;
  name: string;
  color: string;
};

export type TechTag =
  | "VueJS"
  | "ReactJS"
  | "NextJS"
  | "NuxtJS"
  | "Frontend"
  | "Backend"
  | "TailwindCSS"
  | "Typescript"
  | "Strapi"
  | "Pinia"
  | "Sequelize"
  | "PWA";

export interface IPageContent {
  type: string;
  body: string;
  caption: string;
  emoji?: string;
}

export interface NotionResponse {
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
  url: string;
}

export interface TedBy {
  object: string;
  id: string;
}

export interface Parent {
  type: string;
  database_id: string;
}

export interface TitleProperty {
  id: string;
  type: string;
  title: [
    {
      type: string;
      text: {
        content: string;
        link?: string;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href?: string;
    }
  ];
}

export interface RichTextProperty {
  id: string;
  type: string;
  rich_text: [
    {
      type: string;
      text: {
        content: string;
        link?: string;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href?: string;
    }
  ];
}

export interface UrlProperty {
  id: string;
  type: string;
  url: string;
}

export interface NumberProperty {
  id: string;
  type: string;
  number: number;
}

export interface CheckboxProperty {
  id: string;
  type: string;
  checkbox: boolean;
}

export interface MultiSelectProperty {
  id: string;
  type: string;
  multi_select: Tag[];
}

export interface SelectProperty {
  id: string;
  type: string;
  select: Tag;
}

export interface DateProperty {
  id: string;
  type: string;
  date: {
    start: string;
    end?: string;
    time_zone?: string;
  };
}

export interface RelationProperty {
  id: string;
  type: string;
  relation: {
    id: string;
  }[];
  has_more: boolean;
}

export enum filterProjectOptions {
  FRONTEND = "Frontend",
  BACKEND = "Backend",
  VUEJS = "VueJS",
  REACTJS = "ReactJS",
  NEXTJS = "NextJS",
  TYPESCRIPT = "Typescript",
}