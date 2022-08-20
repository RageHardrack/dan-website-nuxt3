import { Notion, DATABASES_ID, NotionClient } from "~~/vendors";
import {
  PostResponse,
  IPostBlock,
  Tag,
  IPostProperties,
  IPost,
} from "~~/interfaces";

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

    return results.map((item: PostResponse) => {
      return { object: item.object, id: item.id, properties: item.properties };
    });
  }

  async findOne(pageId: string): Promise<IPost> {
    const page = await this.NotionClient.getPage<PostResponse>(pageId);

    const properties: IPostProperties = {
      Tags: page.properties.Tags.multi_select.map((item: Tag) => item.name),
      Image_URL: page.properties.Image_URL.url,
      Status: page.properties.Status.select.name,
      Slug: page.properties.Slug.rich_text[0].plain_text,
      Fecha_Publicacion: page.properties.Fecha_Publicacion.date.start,
      Brief: page.properties.Brief.rich_text[0].plain_text,
      Post: page.properties.Post.title[0].plain_text,
      Prevent_Index: page.properties.Prevent_Index.checkbox,
    };

    return { object: page.object, id: page.id, properties };
  }

  async getPostContent(blockId: string): Promise<IPostBlock> {
    const { results } = await this.NotionClient.getPageContent(blockId, {
      page_size: 100,
    });

    // TODO: Type block content
    return results.map((block: any) => {
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
