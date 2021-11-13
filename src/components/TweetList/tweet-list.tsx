import React from "react";
import { Tweet } from "./tweet";
import TweetComponent from "./tweet";

const TweetList = ({ tweets }: { tweets: Tweet[] }) => {
  return (
    <>
      {tweets.map((tweet) => {
        return (
          <TweetComponent key={tweet.id} tweet={tweet}>
            {tweet.id}
          </TweetComponent>
        );
      })}
    </>
  );
};

export default TweetList;
