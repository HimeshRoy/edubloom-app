const { app, BrowserWindow } = require("electron");

let win;

app.whenReady().then(() => {
  win = new BrowserWindow({
    fullscreen: true,
    kiosk: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL("http://localhost:5173/test/123/start");

  // ❌ BLOCK DEVTOOLS
  win.webContents.on("devtools-opened", () => {
    win.webContents.closeDevTools();
  });

  // ❌ BLOCK SHORTCUTS
  win.webContents.on("before-input-event", (event, input) => {
    if (
      input.key === "F12" ||
      (input.control && input.shift && input.key === "I") ||
      (input.control && input.key === "r")
    ) {
      event.preventDefault();
    }
  });

  // ❌ FORCE FULLSCREEN
  win.on("leave-full-screen", () => {
    win.setFullScreen(true);
  });
});