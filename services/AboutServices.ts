import { ContentBlock, IPageContent } from "~~/interfaces";
import { blockChildrenTransformer } from "~~/utils";
import { Notion, DATABASES_ID, NotionClient } from "~~/vendors";

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
      return blockChildrenTransformer(block);
    });
  }
}

export const AboutService = new AboutServices(Notion, DATABASES_ID.ABOUT_ID);
