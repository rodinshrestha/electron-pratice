import React from "react";
import { TakeScreenshotWithTimer } from "./utils/TakeScreenshotWithTimer";
import "./style.css";

const App = () => {
  const { time, start, pause } = TakeScreenshotWithTimer(5);

  return (
    <div className="App">
      <div>
        {time.hrs}:{time.min}:{time.sec}
      </div>
      <button onClick={start}>Start</button>
      <button onClick={pause}>pause</button>
      <button onClick={() => window.myAPI.takeScreenshot()}>Screen Shot</button>
      {/* <video /> */}
      {/* <img src="https://picsum.photos/400/500" className="resize-image" /> */}
      {/* <div> */}
      <div style={{ position: "relative" }}>
        <canvas id="my-canvas" width="400" height={400} />
        <canvas
          id="anotherCanvas"
          width="400"
          height={400}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export default App;
