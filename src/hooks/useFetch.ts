import { useEffect, useState } from 'react'
import axios from 'axios'

import { IRedditResponse } from 'types/reddit'

let isMounted = false;

const useFetch = (url: string) => {

  const [error, setError] = useState(null);
  const [data, setPostsData] = useState<IRedditResponse | null>(null);
  const [pending, setPending] = useState(true);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);


  const fetchMore = async (before: string, after: string) => {
    setFetchMoreLoading(true);
    try {
      const response = await axios.get(`${url}?before=${before}&after=${after}`);
      if (data && response.data) {
        const { data: { after, before, children }, kind }: IRedditResponse = response.data;
        setPostsData((prev) => ({
          kind,
          data: {
            after,
            before,
            children: [...prev!.data.children, ...children]
          }
        }))
      }
      setFetchMoreLoading(false);
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }

  const fetchData = async () => {
    try {
      let source = axios.CancelToken.source();
      const response = await axios.get(url, { cancelToken: source.token });
      if (!isMounted) source.cancel();
      setPostsData(response.data);
      setPending(false);
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }

  useEffect(() => {
    isMounted = true;
    setPending(true);
    fetchData();
    return () => {
      isMounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return {
    data,
    fetchMore,
    error: error,
    loading: pending,
    fetchMoreLoading,
  }
}

export default useFetch