import { MultiSelect } from "./Share";

export interface PostProperties {
  Tags: MultiSelect[];
  Image_URL: string;
  Status: string;
  Slug: string;
  Fecha_Publicacion: any;
  Brief: string;
  Post: string;
  Prevent_Index: boolean;
}

export interface IPost {
  object: string;
  id: string;
  properties: PostProperties;
}

export interface IPostContent {
  properties: PostProperties;
  content: IPostBlock;
}

export interface IPostBlock {
  type: string;
  body: string;
  caption: string;
}
