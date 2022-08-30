import { Notion, DATABASES_ID, NotionClient } from "~~/vendors";
import { PostResponse, IPageContent, IPost, ContentBlock } from "~~/interfaces";
import { blockChildrenTransformer, postPropertiesTransformer } from "~~/utils";

class BlogServices {
  constructor(
    private readonly NotionClient: NotionClient,
    private readonly databaseId: string
  ) {}

  async findAll(): Promise<IPost[]> {
    const results = await this.NotionClient.getDatabase<PostResponse[]>(
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
          ],
        },
        sorts: [{ property: "Fecha_Publicacion", direction: "descending" }],
      }
    );

    const pages = results.map((page: PostResponse) => {
      return {
        object: page.object,
        id: page.id,
        properties: postPropertiesTransformer(page.properties),
      };
    });

    return pages;
  }

  async findOne(pageId: string): Promise<IPost> {
    const page = await this.NotionClient.getPage<PostResponse>(pageId);

    const properties = postPropertiesTransformer(page.properties);

    return { object: page.object, id: page.id, properties };
  }

  async getPostContent(blockId: string): Promise<IPageContent[]> {
    const listBlockChildren = await this.NotionClient.getPageContent<
      ContentBlock[]
    >(blockId, {
      page_size: 100,
    });

    return listBlockChildren.map((block: ContentBlock) => {
      return blockChildrenTransformer(block);
    });
  }
}

export const BlogService = new BlogServices(Notion, DATABASES_ID.BLOG_ID);
