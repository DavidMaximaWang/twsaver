import styled from "@emotion/styled";
import TweetList from "components/TweetList/tweet-list";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Form, Button, Input } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTweets } from "utils/tweet";
import { Tweet } from "./tweet";

const LOCAL_STORAGE_KEY = "tweetsaver";
const TweetPanel: React.FC<any> = () => {
  const [param, setParam] = useState({ q: "", result_type: "popular" });
  const { isLoading, error, data, retry } = useTweets(param);
  const [tweets, setTweets] = useState<Tweet[]>(data || []);
  const onSubmit = () => {
    if (data) {
      setTweets([...data]);
    } else {
      setTweets([]);
    }
  };
  const [savedTweets, setSavedTweets] = useState<Tweet[]>([]);

  const onDragEnd = useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // board reorder
      if (type === "COLUMN") {
        console.log("ondragend column");
      } else if (type === "ROW") {
        const sourceDroppableId = source.droppableId;
        const destDroppableId = destination.droppableId;
        if (sourceDroppableId === "left" && destDroppableId === "right") {
          const sourceTweet = tweets[source.index];
          // const destTweet = tweets[destination.index];
          const leftTweets = [...tweets];
          leftTweets.splice(source.index, 1);
          setTweets(leftTweets);
          const rightTweets = [...savedTweets];
          rightTweets.splice(destination.index + 1, 0, sourceTweet);
          setSavedTweets(rightTweets);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rightTweets));
        } else if (
          sourceDroppableId === "right" &&
          destDroppableId === "left"
        ) {
          const sourceTweet = savedTweets[source.index];
          const rightTweets = [...savedTweets];
          rightTweets.splice(source.index, 1);
          setSavedTweets(rightTweets);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rightTweets));
          const leftTweets = [...tweets];
          leftTweets.splice(destination.index + 1, 0, sourceTweet);
          setTweets(leftTweets);
        }
      }
    },
    [savedTweets, tweets]
  );
  ///
  useEffect(() => {
    const savedTweetsString = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedTweets: Tweet[] = JSON.parse(savedTweetsString || "[]");
    setSavedTweets(parsedTweets);
  }, []);
  const searchPanel = (
    <SearchPanel param={param} setParam={setParam} onSubmit={onSubmit} />
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <LeftPanel tweets={tweets} searchPanel={searchPanel} />
        <RightPanel tweets={savedTweets} />
      </Container>
    </DragDropContext>
  );
};

export default TweetPanel;

const LeftPanel: React.FC<{ tweets: Tweet[]; searchPanel: JSX.Element }> = ({
  tweets,
  searchPanel,
}) => {
  return (
    <PanelContainer>
      {searchPanel}
      <TweetList tweets={tweets || []} pos={"left"} />
    </PanelContainer>
  );
};

const RightPanel: React.FC<any> = ({ tweets }) => {
  return (
    <PanelContainer>
      <p>Number of Tweets: {tweets.length}</p>
      <TweetList tweets={tweets} pos={"right"} />
    </PanelContainer>
  );
};

const SearchPanel: React.FC<any> = ({ param, setParam, onSubmit }) => {
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
      <Form.Item>
        <Button onClick={onSubmit}> Search</Button>
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
