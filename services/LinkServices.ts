import { Notion, DATABASES_ID, NotionClient } from "~~/vendors";
import { Link, LinkProperties } from "~~/interfaces";

class LinkServices {
  constructor(
    private readonly NotionClient: NotionClient,
    private readonly databaseId: string
  ) {}

  async findAll() {
    const res = await this.NotionClient.getDatabase<Link[]>(this.databaseId, {
      sorts: [{ property: "Orden", direction: "ascending" }],
    });

    return res
      .map((link: Link) => link.properties)
      .map((property: LinkProperties) => {
        return {
          Link: property.Link.url,
          Orden: property.Orden.number,
          Name: property.Name.title[0].plain_text,
        };
      });
  }
}

export const LinkService = new LinkServices(Notion, DATABASES_ID.LINK_TREE_ID);
