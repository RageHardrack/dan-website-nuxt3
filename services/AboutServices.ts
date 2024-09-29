import { blockContentAdapter } from "~~/adapters";
import type { RawContentBlock, ContentBlock } from "~~/interfaces";
import { Notion, NotionClient } from "~~/vendors";

const { aboutPage } = useRuntimeConfig();

class AboutServices {
  constructor(
    private readonly NotionClient: NotionClient,
    private readonly databaseId: string
  ) {}

  async getAboutContent(): Promise<ContentBlock[]> {
    const listBlockChildren = await this.NotionClient.getPageContent<
      RawContentBlock[]
    >(this.databaseId, {
      page_size: 100,
    });

    return listBlockChildren.map((block: RawContentBlock) => {
      return blockContentAdapter(block);
    });
  }
}

export const AboutService = new AboutServices(Notion, aboutPage);