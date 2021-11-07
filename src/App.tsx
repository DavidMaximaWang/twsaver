import Button, { ButtonType, ButtonSize } from "./components/Button/button";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button>Hello</Button>
        <Button btnType={ButtonType.Primary} disabled={true}>
          Hello
        </Button>
        <Button btnType={ButtonType.Link} href="http://google.com">
          Google
        </Button>
        <p>
          Edit
          <code>src/App.tsx</code>
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
