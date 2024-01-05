import type {
  ILink,
  ILinkProperties,
  LinkNotionResponse,
  LinkNotionResponseProperties,
} from "~~/interfaces";

export const linkPropertiesAdapter = (
  properties: LinkNotionResponseProperties
): ILinkProperties => ({
  Link: properties.Link.url,
  Orden: properties.Orden.number,
  Name: properties.Name.title[0].plain_text,
  Display: properties.Display.checkbox,
  Stage: properties.Stage.relation[0].id,
});

export const linkAdapter = (results: LinkNotionResponse[]): ILink[] =>
  results.map((link) => ({
    id: link.id,
    ...linkPropertiesAdapter(link.properties),
  }));
