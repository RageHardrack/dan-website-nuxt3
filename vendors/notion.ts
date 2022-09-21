import { Client } from "@notionhq/client";
import { HttpAdapter } from "~~/interfaces";

export const DATABASES_ID = {
  HOME_ID: process.env.NOTION_HOME_ID as string,
  ABOUT_ID: process.env.NOTION_ABOUT_ID as string,
  BLOG_ID: process.env.NOTION_BLOG_ID as string,
  PORTFOLIO_ID: process.env.NOTION_PORTFOLIO_ID as string,
  LINK_TREE_ID: process.env.NOTION_LINK_TREE_ID as string,
};

export class NotionClient implements HttpAdapter {
  private notion = new Client({ auth: process.env.NOTION_API_KEY });

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
