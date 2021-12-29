import React from "react";

export const TakeScreenshotWithTimer = (min) => {
  const [time, setTime] = React.useState({
    hrs: 0,
    min: 0,
    sec: 0,
  });

  const timeInterval = React.useRef(null);

  let updatedMin = 0,
    updatedHrs = 0,
    updatedSec = 0;

  const run = () => {
    if (updatedSec === 60) {
      updatedMin++;
      updatedSec = 0;
    }
    if (updatedMin === 60) {
      updatedHrs++;
      updatedMin = 0;
    }
    if (updatedMin !== 0 && updatedMin % min === 0 && updatedSec === 0) {
      //take screenshot
      console.log("screenshot", min);
    }
    updatedSec++;

    return setTime({
      hrs: updatedHrs,
      min: updatedMin,
      sec: updatedSec,
    });
  };

  const start = () => {
    if (!timeInterval.current) timeInterval.current = setInterval(run, 10);
  };

  const pause = () => {
    console.log("asdasd");
    if (timeInterval.current) {
      clearInterval(timeInterval.current);
      timeInterval.current = null;
    }
  };

  const safeStart = React.useCallback(start, []);

  return { start: safeStart, pause, time };
};
