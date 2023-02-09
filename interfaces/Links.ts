import {
  UrlProperty,
  NumberProperty,
  TitleProperty,
  CheckboxProperty,
  RelationProperty,
  NotionResponse
} from ".";

export interface LinkNotionResponse extends NotionResponse {
  properties: LinkNotionResponseProperties;
}

export interface ILink extends ILinkProperties {
  id: string;
}

export interface LinkNotionResponseProperties {
  Link: UrlProperty;
  Orden: NumberProperty;
  Name: TitleProperty;
  Display: CheckboxProperty;
  Stage: RelationProperty;
}

export interface ILinkProperties {
  Link: string;
  Orden: number;
  Name: string;
  Display: boolean;
  Stage: string;
}