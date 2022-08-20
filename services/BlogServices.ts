import { Notion, DATABASES_ID, NotionClient } from "~~/vendors";
import { PostResponse, IPostBlock, IPost } from "~~/interfaces";
import { postPropertiesTransformer } from "~~/utils";

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

    const pages = results.map((item: PostResponse) => {
      return {
        object: item.object,
        id: item.id,
        properties: postPropertiesTransformer(item.properties),
      };
    });

    return pages;
  }

  async findOne(pageId: string): Promise<IPost> {
    const page = await this.NotionClient.getPage<PostResponse>(pageId);

    const properties = postPropertiesTransformer(page.properties);

    return { object: page.object, id: page.id, properties };
  }

  async getPostContent(blockId: string): Promise<IPostBlock[]> {
    // TODO: Type block content Response
    const listBlockChildren = await this.NotionClient.getPageContent<any[]>(
      blockId,
      {
        page_size: 100,
      }
    );

    // TODO: Type block content
    return listBlockChildren.map((block: any) => {
      return {
        type: block.type,
        body:
          block.type === "image"
            ? block[block.type].file.url
            : block[block.type].rich_text[0].plain_text,
        caption:
          block.type === "image"
            ? block[block.type].caption[0].plain_text
            : block[block.type].rich_text[0].plain_text,
      };
    });
  }
}

export const BlogService = new BlogServices(Notion, DATABASES_ID.BLOG_ID);
