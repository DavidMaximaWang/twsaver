import React from "react";
import TweetList from "components/TweetList/tweet-list";
import { useTweets } from "utils/tweet";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import TweetPanel from "./tweet-panel";

const TweetSaver: React.FC<any> = () => {
  const { isLoading, error, data: tweets, retry } = useTweets();
  return (
    <Container>
      <PageHeader />
      <TweetPanel />
    </Container>
  );
};

export default TweetSaver;

const PageHeader: React.FC<any> = () => {
  return (
    <Header between={true}>
      <h1>TweetSaver</h1> <Author name={"Qunling"} at={"2021-11-13"} />
    </Header>
  );
};

const Author: React.FC<{ name: string; at: string; email?: string }> = ({
  name,
  at,
}) => {
  return (
    <p>
      <span>
        {name} {at}
      </span>
    </p>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  /* position:fixed; */
`;
