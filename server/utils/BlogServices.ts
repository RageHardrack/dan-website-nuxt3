import { Notion, NotionClient } from "~~/vendors";
import type {
  PostNotionResponse,
  IPageContent,
  IPost,
  RawContentBlock,
} from "~~/interfaces";
import {
  postAdapter,
  postPropertiesAdapter,
  blockContentAdapter,
} from "~~/adapters";

const { blogPage } = useRuntimeConfig();

class BlogServices {
  private environment = getEnvironmentId();

  constructor(
    private readonly NotionClient: NotionClient,
    private readonly databaseId: string
  ) {}

  async findAll(): Promise<IPost[]> {
    const results = await this.NotionClient.getDatabase<PostNotionResponse[]>(
      this.databaseId,
      {
        page_size: 10,
        filter: {
          and: [
            {
              property: "Status",
              select: {
                equals: "Publicado",
              },
            },
            {
              property: "Stage",
              relation: {
                contains: this.environment,
              },
            },
          ],
        },
        sorts: [{ property: "Fecha_Publicacion", direction: "descending" }],
      }
    );

    return postAdapter(results);
  }

  async findOne(pageId: string): Promise<IPost> {
    const page = await this.NotionClient.getPage<PostNotionResponse>(pageId);

    return {
      id: page.id,
      ...postPropertiesAdapter(page.properties),
    };
  }

  async getPostContent(blockId: string): Promise<IPageContent[]> {
    const listBlockChildren = await this.NotionClient.getPageContent<
      RawContentBlock[]
    >(blockId, {
      page_size: 100,
    });

    return listBlockChildren.map((block: RawContentBlock) => {
      return blockContentAdapter(block);
    });
  }
}

export const BlogService = new BlogServices(Notion, blogPage);
