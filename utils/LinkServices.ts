import { notion, LINK_TREE_ID } from "~~/vendors";

const linkServices = {
  fetchLinksDatabase: async () => {
    const { results } = await notion.databases.query({
      database_id: LINK_TREE_ID,
      sorts: [{ property: "Orden", direction: "ascending" }],
    });

    return results;

    return results
      .map((link: any) => link.properties)
      .map((property) => {
        return {
          Link: property.Link.url,
          Orden: property.Orden.number,
          Name: property.Name.title[0].plain_text,
        };
      });
  },
};

export default linkServices;
