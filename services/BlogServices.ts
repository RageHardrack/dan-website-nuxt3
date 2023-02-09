import { Notion, NotionClient } from "~~/vendors";
import {
  PostNotionResponse,
  IPageContent,
  IPost,
  ContentBlock,
} from "~~/interfaces";
import { getEnvironmentId } from "~~/utils";
import {
  postAdapter,
  postPropertiesAdapter,
  blockContentAdapter,
} from "~~/adapters";

const { blogPage } = useRuntimeConfig();

class BlogServices {
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
                contains: getEnvironmentId(),
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
      ContentBlock[]
    >(blockId, {
      page_size: 100,
    });

    return listBlockChildren.map((block: ContentBlock) => {
      return blockContentAdapter(block);
    });
  }
}

export const BlogService = new BlogServices(Notion, blogPage);
