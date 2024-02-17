import { Notion, NotionClient } from "~~/vendors";
import type { ILink, LinkNotionResponse } from "~~/interfaces";
import { linkAdapter } from "~~/adapters";
import { getEnvironmentId } from "~~/utils";

const { linkTreePage } = useRuntimeConfig();

class LinkServices {
  constructor(
    private readonly NotionClient: NotionClient,
    private readonly databaseId: string
  ) {}

  async findAll(): Promise<ILink[]> {
    const results = await this.NotionClient.getDatabase<LinkNotionResponse[]>(
      this.databaseId,
      {
        sorts: [{ property: "Orden", direction: "ascending" }],
        filter: {
          and: [
            {
              property: "Display",
              checkbox: {
                equals: true,
              },
            },
            {
              property: "Stage",
              relation: {
                contains: getEnvironmentId(),
              },
            },
          ],
        },
      }
    );

    return linkAdapter(results);
  }
}

export const LinkService = new LinkServices(Notion, linkTreePage);
