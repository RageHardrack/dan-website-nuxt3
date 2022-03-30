import { Client } from "@notionhq/client";

export const HOME_ID = process.env.NOTION_HOME_ID as string;
export const ABOUT_ID = process.env.NOTION_ABOUT_ID as string;
export const BLOG_ID = process.env.NOTION_BLOG_ID as string;
export const PORTFOLIO_ID = process.env.NOTION_PORTFOLIO_ID as string;
export const LINK_TREE_ID = process.env.NOTION_LINK_TREE_ID as string;

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default notion;
