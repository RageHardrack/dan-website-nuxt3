import { blockContentAdapter } from "~~/adapters";
import { ContentBlock, IPageContent } from "~~/interfaces";
import { Notion, NotionClient } from "~~/vendors";

const { aboutPage } = useRuntimeConfig();

class AboutServices {
  constructor(
    private readonly NotionClient: NotionClient,
    private readonly databaseId: string
  ) {}

  async getAboutContent(): Promise<IPageContent[]> {
    const listBlockChildren = await this.NotionClient.getPageContent<
      ContentBlock[]
    >(this.databaseId, {
      page_size: 100,
    });

    return listBlockChildren.map((block: ContentBlock) => {
      return blockContentAdapter(block);
    });
  }
}

export const AboutService = new AboutServices(Notion, aboutPage);
