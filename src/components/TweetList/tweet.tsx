import React from "react";
import { Status } from "twitter-d";
export interface Tweet extends Status {
  text: string;
}

const User: React.FC<any> = ({ user }) => {
  return <img src={user.profile_image_url_https} alt="" />;
};
const TweetComponent: React.FC<{ tweet: Tweet }> = ({ tweet }) => {
  console.log("🚀 ~ file: tweet.tsx ~ line 5 ~ tweet", tweet);
  const { text, user, created_at } = tweet;
  return (
    <div key={tweet.id}>
      <User user={user} />
      {text}
    </div>
  );
};

export default TweetComponent;
