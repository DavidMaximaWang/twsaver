import React from "react";
import { Tweet } from "./tweet";
import TweetComponent from "./tweet";
import styled from "@emotion/styled";
import { Drag, Drop, DropChild } from "components/drag-and-drop";

type LeftRight = "left" | "right";
const TweetList = ({ tweets, pos }: { tweets: Tweet[]; pos: LeftRight }) => {
  return (
    <Container>
      <Drop type={"ROW"} direction={"vertical"} droppableId={pos}>
        <DropChild style={{ minHeight: "1rem" }}>
          {tweets.map((tweet, index) => (
            <Drag key={tweet.id} draggableId={"_" + tweet.id} index={index}>
              <div>
                <TweetComponent key={tweet.id} tweet={tweet}>
                  {tweet.id}
                </TweetComponent>
              </div>
            </Drag>
          ))}
        </DropChild>
      </Drop>
    </Container>
  );
};

export default TweetList;

const Container = styled.div`
  width: 100%;
  /* margin-left: 3rem; */
  margin: 0;
  padding: 0.1rem 0;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
`;
