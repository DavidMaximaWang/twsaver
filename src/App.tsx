import TweetList from "components/TweetList/tweet-list";
import { useTweets } from "utils/tweet";
const App: React.FC = () => {
  const { isLoading, error, data: tweets, retry } = useTweets();

  return (
    <div className="App">
      <TweetList tweets={tweets || []} />
    </div>
  );
};

export default App;
