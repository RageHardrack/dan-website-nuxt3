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
