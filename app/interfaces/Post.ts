import type {
  NotionResponse,
  MultiSelectProperty,
  UrlProperty,
  SelectProperty,
  RichTextProperty,
  DateProperty,
  TitleProperty,
  CheckboxProperty,
  RelationProperty,
  IPageContent,
} from "./Share";

export interface PostNotionResponse extends NotionResponse {
  properties: PostNotionResponseProperties;
}

export interface PostNotionResponseProperties {
  Tags: MultiSelectProperty;
  Image_URL: UrlProperty;
  Status: SelectProperty;
  Slug: RichTextProperty;
  Fecha_Publicacion: DateProperty;
  Brief: RichTextProperty;
  Post: TitleProperty;
  Prevent_Index: CheckboxProperty;
  Language: SelectProperty;
  Stage: RelationProperty;
}

export interface IPost extends IPostProperties {
  id: string;
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
  Language: string;
  Stage: string;
}

export interface IPostContent {
  properties: PostNotionResponseProperties;
  content: IPageContent;
}
