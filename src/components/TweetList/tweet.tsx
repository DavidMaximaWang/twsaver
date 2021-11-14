import styled from "@emotion/styled";
import { Avatar, Card } from "antd";
import "antd/dist/antd.css";
import dayjs from "dayjs";
import React from "react";
import { Status } from "twitter-d";

export interface Tweet extends Status {
  text: string;
  saved?: boolean;
}

const User: React.FC<any> = ({ user }) => {
  const { name } = user;
  return (
    <Container>
      <Avatar src={user.profile_image_url_https} alt="" />
      <p>
        <span>{name}</span>
      </p>
    </Container>
  );
};

const TweetComponent: React.FC<{ tweet: Tweet }> = ({ tweet }) => {
  const { text, user, created_at } = tweet;
  return (
    <Card
      key={tweet.id}
      title={<User user={user} />}
      type="inner"
      extra={<span>{dayjs(created_at).format("YYYY-MM-DD HH:mm")}</span>}
      style={{
        width: "auto",
        margin: ".5rem",
        boxSizing: "border-box",
        marginTop: 16,
        cursor: "pointer",
      }}
    >
      {text}
    </Card>
  );
};

const Container = styled.div`
  display: flex;
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
  p {
    margin: auto;
    margin-left: 1rem;
  }
`;
export default TweetComponent;
