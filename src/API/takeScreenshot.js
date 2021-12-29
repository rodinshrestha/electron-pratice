const { desktopCapturer } = require("electron");
const fs = require("fs");
const moment = require("moment");
var screenshot = require("desktop-screenshot");

const takeScreenshot = () => {
  // desktopCapturer
  //   .getSources({ types: ["screen"] })
  //   .then(async (sources) => {
  //     console.log("running");
  //     console.log(sources);
  //     sources.forEach((source, i) => {
  //       const src = source.thumbnail.toDataURL();
  //       console.log(src);
  //       fs.writeFile(
  //         `/home/rodin/Desktop/screenshot/${moment().format(
  //           "MM ddd, YYYY hh:mm:ss a"
  //         )}.png`,
  //         src.toPNG(),
  //         "base64",
  //         (err) => {
  //           if (err) console.log(err);
  //           console.log("file saved");
  //           // notify("Electron", "Screen shot captured");
  //         }
  //       );
  //       // const src = source.thumbnail.toDataURL();
  //       // console.log(src);
  //     });
  //   })

  //   .catch((err) => console.log(err));
  screenshot("./screenshot.png", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });
};
module.exports = takeScreenshot;
