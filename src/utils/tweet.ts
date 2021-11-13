import { Tweet } from "components/TweetList/tweet";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "utils/useAsync";
const tweetKey = "twitter.json";
export const useTweets = (param?: Partial<Tweet>) => {
  const { run, ...rest } = useAsync<Tweet[]>();

  const client = useHttp();
  const fetchTweets = () =>
    client(tweetKey, { data: cleanObject(param || {}) });
  useEffect(() => {
    debugger;
    run(
      fetchTweets().then(
        (data: { statuses: Tweet[]; search_metadata: any }) => {
          return data.statuses;
        }
      ),
      { retry: fetchTweets }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return rest;
};
