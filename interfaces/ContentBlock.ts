export interface ContentBlockResponse {
  object: string;
  results: ContentBlock[];
  next_cursor?: string;
  has_more: boolean;
  type: string;
  block?: any;
}

export interface ContentBlock {
  object: string;
  id: string;
  type: string;
  body: string;
  caption: string;
  emoji?: string;
}
