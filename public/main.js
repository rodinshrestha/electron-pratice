const { app, BrowserWindow, ipcMain } = require("electron");

const path = require("path");
require("@electron/remote/main").initialize();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // ipcMain.handle("DESKTOP_CAPTURER_GET_SOURCES", () => {
  //   return demo();
  // });

  win.loadURL("http://localhost:3000");

  ipcMain.on("re-render", () => {
    win.loadFile("http://localhost:3000");
  });

  // console.log(await tasklist());
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
