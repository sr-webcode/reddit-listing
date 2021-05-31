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
    body?: string;
    title: string;
    author: string;
    is_video: boolean;
    permalink: string;
    thumbnail: string;
    secure_media?: {
      reddit_video: {
        fallback_url: string;
      }
    }
    created_utc: number;
    num_comments: number;
    subreddit_name_prefixed: string
  }
}