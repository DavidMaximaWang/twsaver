import React from "react";
import { Tweet } from "./tweet";
import TweetComponent from "./tweet";
import styled from "@emotion/styled";

const TweetList = ({ tweets }: { tweets: Tweet[] }) => {
  return (
    <div>
      {tweets.map((tweet) => {
        return (
          <TweetComponent key={tweet.id} tweet={tweet}>
            {tweet.id}
          </TweetComponent>
        );
      })}
    </div>
  );
};

export default TweetList;

const Container = styled.div`
  width: 700px;
  height: 100%;
  margin-left: 3rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
`;
