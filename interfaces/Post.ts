import {
  Parent,
  TedBy,
  CheckboxProperty,
  DateProperty,
  MultiSelectProperty,
  RichTextProperty,
  SelectProperty,
  TitleProperty,
  UrlProperty,
} from ".";

export interface PostResponse {
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
  properties: PostResponseProperties;
  url: string;
}

export interface PostResponseProperties {
  Tags: MultiSelectProperty;
  Image_URL: UrlProperty;
  Status: SelectProperty;
  Slug: RichTextProperty;
  Fecha_Publicacion: DateProperty;
  Brief: RichTextProperty;
  Post: TitleProperty;
  Prevent_Index: CheckboxProperty;
}

export interface IPost {
  object: string;
  id: string;
  properties: PostResponseProperties | IPostProperties;
}

export interface IPostProperties {
  Tags: string[];
  Image_URL: string;
  Status: string;
  Slug: string;
  Fecha_Publicacion: string;
  Brief: string;
  Post: string;
  Prevent_Index: boolean;
}

export interface IPostContent {
  properties: PostResponseProperties;
  content: IPostBlock;
}

export interface IPostBlock {
  type: string;
  body: string;
  caption: string;
}
