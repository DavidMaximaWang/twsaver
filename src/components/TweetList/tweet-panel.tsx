import styled from "@emotion/styled";
import TweetList from "components/TweetList/tweet-list";
import { DragDropContext } from "react-beautiful-dnd";
import { Form, Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useTweets } from "utils/tweet";
import { Tweet } from "./tweet";

const TweetPanel: React.FC<any> = () => {
  return (
    <DragDropContext onDragEnd={() => {}}>
      <Container>
        <LeftPanel />
        <RightPanel />
      </Container>
    </DragDropContext>
  );
};

export default TweetPanel;

const LeftPanel: React.FC<any> = () => {
  const [param, setParam] = useState({ q: "", result_type: "popular" });
  const { isLoading, error, data: tweets, retry } = useTweets(param);

  return (
    <PanelContainer>
      <SearchPanel param={param} setParam={setParam} />
      <TweetList tweets={tweets || []} pos={"left"} />
    </PanelContainer>
  );
};

const RightPanel: React.FC<any> = () => {
  const [savedTweets, setSavedTweets] = useState<Tweet[]>([]);
  useEffect(() => {
    const savedTweetsString = localStorage.getItem("tweetsaver");
    const parsedTweets: Tweet[] = JSON.parse(savedTweetsString || "[]");
    setSavedTweets(parsedTweets);
  }, []);
  return (
    <PanelContainer>
      <p>Number of Tweets: {savedTweets.length}</p>
      <TweetList tweets={savedTweets || []} pos={"right"} />
    </PanelContainer>
  );
};

const SearchPanel: React.FC<any> = ({ param, setParam }) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder="project name"
          type="text"
          value={param.q}
          onChange={(e) => setParam({ ...param, q: e.target.value })}
        />
      </Form.Item>
    </Form>
  );
};

const Container = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: row;
`;

const PanelContainer = styled.div`
  width: 700px;
  height: 100%;
  margin-left: 3rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
`;
