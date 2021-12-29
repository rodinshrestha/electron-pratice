const { transcode } = require("buffer");
const { contextBridge, desktopCapturer } = require("electron");
// import moment from "moment";
const fs = require("fs");
// const takeScreenshot = require("../src/API/takeScreenshot");

contextBridge.exposeInMainWorld("myAPI", {
  loadPreferences: () => console.log("here,,,,,,preload"),
  takeScreenshot: () =>
    desktopCapturer.getSources({ types: ["screen"] }).then(async (sources) => {
      console.log(sources);
      for (const source of sources) {
        // console.log("aaa", source);
        if (source.name === "Screen 1") {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: "desktop",
                  chromeMediaSourceId: source.id,
                  minWidth: 1280,
                  maxWidth: 1280,
                  minHeight: 720,
                  maxHeight: 720,
                },
              },
            });
            // handleStream(stream);
            resizeableImage(stream);
          } catch (e) {
            console.log(e);
          }
        }
      }
    }),
  resizeImage: () => resizeableImage(),
});

const handleStream = (stream) => {
  const video = document.createElement("video");
  video.srcObject = stream;
  video.onloadedmetadata = (e) => {
    console.log(screen.width);
    video.play();
    const canvas = document.createElement("canvas");
    canvas.width = screen.width;
    canvas.height = screen.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const src = canvas.toDataURL("image/png");
    console.log(src);

    document.querySelector("#screen").src = src;
    video.remove();

    // resizeableImage(src)
  };
};

const resizeableImage = () => {
  const myCanvas = document.getElementById("my-canvas");
  const myContext = myCanvas.getContext("2d");
  const img = new Image();
  img.src = "https://picsum.photos/400/500";
  // myCanvas.style.cursor = nw - resize;
  let e = window.event;

  img.onload = () => {
    myContext.drawImage(img, 0, 0);
  };

  const canvas = document.getElementById("anotherCanvas");
  const context = canvas.getContext("2d");

  let startPosX = null;
  let startPosY = null;
  let currentPosX = null;
  let currentPosY = null;
  let isFinished = false;
  let width = null;
  let height = null;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  let rect = {};

  const rectCanvas = myCanvas.getBoundingClientRect();

  document.onmouseup = (e) => {
    console.log(rect);

    isFinished = false;
  };

  document.onmousedown = (e) => {
    startPosX = parseInt(e.pageX - rectCanvas.left);
    startPosY = parseInt(e.pageY - rectCanvas.top);
    isFinished = true;

    rect = {
      x: startPosX,
      y: startPosY,
      w: 0,
      h: 0,
    };
  };

  document.onmousemove = (e) => {
    if (!isFinished) return;
    currentPosX = parseInt(e.pageX - rectCanvas.left);
    currentPosY = parseInt(e.pageY - rectCanvas.top);

    width = currentPosX - startPosX;
    height = currentPosY - startPosY;

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    draw(rect.x, rect.y, width, height);
  };

  const draw = (x, y, w, h) => {
    rect = {
      x,
      y,
      w,
      h,
    };
    context.strokeRect(x, y, w, h);
  };
};
