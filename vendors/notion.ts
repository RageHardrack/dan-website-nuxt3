import { Client } from "@notionhq/client";
import type { HttpAdapter } from "~~/interfaces";

const { notionSecret } = useRuntimeConfig();

export class NotionClient implements HttpAdapter {
  private notion = new Client({ auth: notionSecret });

  async getDatabase<T>(databaseId: string, options = {}): Promise<T> {
    const { results } = await this.notion.databases.query({
      database_id: databaseId,
      ...options,
    });

    return results as unknown as T;
  }

  //TODO: Type in HTTPAdapter
  async getPage<T>(pageId: string, options = {}): Promise<T> {
    const page = await this.notion.pages.retrieve({
      page_id: pageId,
      ...options,
    });

    return page as unknown as T;
  }

  //TODO: Type in HTTPAdapter
  async getPageContent<T>(blockId: string, options = {}): Promise<T> {
    const { results } = await this.notion.blocks.children.list({
      block_id: blockId,
      ...options,
    });

    return results as unknown as T;
  }
}

export const Notion = new NotionClient();
