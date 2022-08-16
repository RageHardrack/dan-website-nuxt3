import { Link } from "~~/interfaces";
import { notion, LINK_TREE_ID } from "~~/vendors";

class LinkServices {
  constructor(
    private readonly databaseId: string,
    private readonly NotionClient: any
  ) {}

  private async queryDatabase() {
    const { results } = await this.NotionClient.databases.query({
      database_id: this.databaseId,
      sorts: [{ property: "Orden", direction: "ascending" }],
    });

    return results as Link[];
  }

  async findAll() {
    const res = await this.queryDatabase();

    return res
      .map((link: any) => link.properties)
      .map((property) => {
        return {
          Link: property.Link.url as string,
          Orden: property.Orden.number as string,
          Name: property.Name.title[0].plain_text as string,
        };
      });
  }
}

export const LinkService = new LinkServices(LINK_TREE_ID, notion);
