import {
  TedBy,
  Parent,
  UrlProperty,
  NumberProperty,
  TitleProperty,
  CheckboxProperty,
  RelationProperty,
} from ".";

export interface Link {
  object: { id: string };
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: TedBy;
  last_edited_by: TedBy;
  cover?: string;
  icon?: string;
  parent: Parent;
  archived: boolean;
  properties: LinkProperties;
  url: string;
}

export interface LinkProperties {
  Link: UrlProperty;
  Orden: NumberProperty;
  Name: TitleProperty;
  Display: CheckboxProperty;
  Stage: RelationProperty;
}
