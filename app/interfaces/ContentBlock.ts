import type { Parent, TedBy } from "./Share";

export type BlockType =
  | "paragraph"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "callout"
  | "quote"
  | "bulleted_list_item"
  | "numbered_list_item"
  | "to_do"
  | "toggle"
  | "code"
  | "child_page"
  | "child_database"
  | "embed"
  | "image"
  | "video"
  | "file"
  | "pdf"
  | "bookmark"
  | "equation"
  | "divider"
  | "table_of_contents"
  | "breadcrumb"
  | "column_list"
  | "column"
  | "link_preview"
  | "table"
  | "table_row";

export interface ContentBlockResponse {
  object: string;
  results: ContentBlock[];
  next_cursor?: string;
  has_more: boolean;
  type: string;
  block?: any;
}

export interface RawContentBlock {
  object: string;
  id: string;
  parent: Parent;
  created_time: string;
  last_edited_time: string;
  created_by: TedBy;
  last_edited_by: TedBy;
  has_children: boolean;
  archived: boolean;
  type: string;
  child_database: RawChildDatabase;
  image?: {
    file: { url: string };
    caption: { plain_text: string }[];
  };
  paragraph?: { rich_text: { plain_text: string }[] };
  callout?: { icon: { emoji: string | null } };
}

export interface RawChildDatabase {
  title: string;
}

export interface ContentBlock {
  object: string;
  id: string;
  type: BlockType;
  body: string;
  caption: string;
  emoji: string | null;
}

export type ApiResponseContentBlock = {
  content: ContentBlock[];
};

export interface ChildDatabase {
  object: string;
  id: string;
  type: string;
  title: string;
}
