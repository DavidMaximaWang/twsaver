import React from "react";
import { Tweet } from "./tweet";
import TweetComponent from "./tweet";
import styled from "@emotion/styled";
import { Drag, Drop, DropChild } from "components/drag-and-drop";

type LeftRight = "left" | "right";
const TweetList = ({ tweets, pos }: { tweets: Tweet[]; pos: LeftRight }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
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
