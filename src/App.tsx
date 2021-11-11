import { useEffect } from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import JsonP from "jsonp";
type Callback = (data: any) => any;
class Axios {
  static jsonp(options: { url: string; fn?: Callback }): Promise<any> {
    return new Promise((resolve, reject) => {
      JsonP(
        options.url,
        {
          param: "callback",
        },
        function (err: any, res: any) {
          const fn =
            options.fn ??
            function (a) {
              return a;
            };
          resolve(fn(res));
        }
      );
    });
  }
}

const myJsonp = (url: any, callback: any) => {
  let callbackName = "_callback_" + Math.round(99999 * Math.random());
  (window as any)[callbackName] = (data: any) => {
    delete (window as any)[callbackName];
    document.body.removeChild(script);
    callback(data);
  };
  let script = document.createElement("script");
  script.src =
    url + (url.indexOf("?") >= 0 ? "&" : "?") + "callback=" + callbackName;
  script.type = "javascript";
  document.body.appendChild(script);
  return script.src;
};
const url = "http://tweetsaver.herokuapp.com/?q=obama&&count=10";
const App: React.FC = () => {
  // useEffect(()=>{
  //   const callback = (data:any):any=>{return data}
  //   fetch( myJsonp(url, (response:any):any => callback(JSON.parse(response.data))), {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/javascript'
  //     }
  // })
  // .then((receivedData) => {
  //     console.log("🚀 ~ file: App.tsx ~ line 50 ~ .then ~ receivedData", receivedData)
  //   })
  //   .catch((error) => {console.log(error)})
  // })
  useEffect(() => {
    Axios.jsonp({
      url,
      fn: function (data: any) {
        return data;
      },
    })
      .then((res: any) => {
        console.log("aa ", res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  });
  return (
    <div className="App">
      <header className="App-header">
        <Button className="custom"> Hello </Button>
        <Button disabled> Disabled Button </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          {" "}
          Large Primary{" "}
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
          {" "}
          Small Danger{" "}
        </Button>
        {/* <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_blank"> Baidu Link </Button> */}
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>
          {" "}
          Disabled Link{" "}
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
