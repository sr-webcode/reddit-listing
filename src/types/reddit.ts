export interface IRedditResponse {
  kind: string;
  data: {
    children: IRedditData[]
    after: string;
    before: string;
  }
}

export interface IRedditData {
  kind: string;
  data: {
    id: string;
    url: string;
    score: number
    title: string;
    author: string;
    permalink: string;
    thumbnail: string;
    created_utc: number;
    num_comments: number;
    subreddit_name_prefixed: string
  }
}