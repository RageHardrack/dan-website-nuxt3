import { TedBy, Parent } from ".";

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
}

export interface RawChildDatabase {
  title: string;
}

export interface ContentBlock {
  object: string;
  id: string;
  type: string;
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
