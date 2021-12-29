// const fs = require("fs");
(async () => {
  const watcher = require("fs").watcher("http://localhost:3000");
  watcher.on("change", () => {
    console.log("reloaded");
  });
})();
