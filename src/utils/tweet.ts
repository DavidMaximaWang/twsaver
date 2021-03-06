import { Tweet } from "components/TweetList/tweet";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "utils/useAsync";
const tweetKey = "tweets.json";
export const useTweets = (param?: any) => {
  const { run, ...rest } = useAsync<Tweet[]>();

  const client = useHttp();
  const fetchTweets = () =>
    client(tweetKey, { data: cleanObject(param || {}) });
  useEffect(() => {
    run(
      fetchTweets().then(
        (data: { statuses: Tweet[]; search_metadata: any }) => {
          return data.statuses;
        }
      ),
      {
        retry: () =>
          fetchTweets().then(
            (data: { statuses: Tweet[]; search_metadata: any }) => {
              return data.statuses;
            }
          ),
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return rest;
};
