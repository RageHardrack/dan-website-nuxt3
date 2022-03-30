import { MultiSelect } from "./Share";

export interface PostProperties {
  Tags: MultiSelect[];
  Image_URL: string;
  Status: string;
  Slug: string;
  Fecha_Publicacion: any;
  Brief: string;
  Post: string;
}

export interface IPost {
  object: string;
  id: string;
  properties: PostProperties;
}
