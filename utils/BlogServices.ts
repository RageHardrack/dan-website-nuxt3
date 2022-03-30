import notion, { BLOG_ID } from "../vendors/notion";
import { IPost, MultiSelect, PostProperties } from "~~/interfaces";

const blogServices = {
  fetchBlogDatabase: async () => {
    const { results } = await notion.databases.query({
      database_id: BLOG_ID,
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
    });

    return results.map((item: any) => {
      return { object: item.object, id: item.id, properties: item.properties };
    });
  },

  fetchPostById: async (pageId: string) => {
    const page = (await notion.pages.retrieve({ page_id: pageId })) as any;

    const properties: PostProperties = {
      Tags: page.properties.Tags.multi_select.map(
        (item: MultiSelect) => item.name
      ),
      Image_URL: page.properties.Image_URL.url,
      Status: page.properties.Status.select.name,
      Slug: page.properties.Slug.rich_text[0].plain_text,
      Fecha_Publicacion: page.properties.Fecha_Publicacion.date.start,
      Brief: page.properties.Brief.rich_text[0].plain_text,
      Post: page.properties.Post.title[0].plain_text,
    };

    return { object: page.object, id: page.id, properties } as IPost;
  },

  fetchPostContent: async (blockId: string) => {
    const { results } = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
    });

    return results.map((block: any) => block.paragraph.rich_text[0].plain_text);
  },
};

export default blogServices;
