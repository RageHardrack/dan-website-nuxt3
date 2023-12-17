import type { Parent, TedBy } from "./Share";

export enum BlockType {
  PARAGRAPH = "paragraph",
  HEADING_1 = "heading_1",
  HEADING_2 = "heading_2",
  HEADING_3 = "heading_3",
  CALLOUT = "callout",
  QUOTE = "quote",
  BULLETED_LIST_ITEM = "bulleted_list_item",
  NUMBERED_LIST_ITEM = "numbered_list_item",
  TO_DO = "to_do",
  TOGGLE = "toggle",
  CODE = "code",
  CHILD_PAGE = "child_page",
  CHILD_DATABASE = "child_database",
  EMBED = "embed",
  IMAGE = "image",
  VIDEO = "video",
  FILE = "file",
  PDF = "pdf",
  BOOKMARK = "bookmark",
  EQUATION = "equation",
  DIVIDER = "divider",
  TABLE_OF_CONTENTS = "table_of_contents",
  BREADCRUMB = "breadcrumb",
  COLUMN_LIST = "column_list",
  COLUMN = "column",
  LINK_PREVIEW = "link_preview",
  TABLE = "table",
  TABLE_ROW = "table_row",
}
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
  [BlockType.IMAGE]?: { file: { url: string }, caption: { plain_text: string }[] };
  [BlockType.PARAGRAPH]?: { rich_text: { plain_text: string }[] };
  [BlockType.CALLOUT]?: { icon: { emoji: string } };
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
  emoji?: string;
}

export interface ChildDatabase {
  object: string;
  id: string;
  type: string;
  title: string;
}
