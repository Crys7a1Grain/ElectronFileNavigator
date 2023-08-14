const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "/preload.js"), //путь к прелоаду
      contextIsolation: true, //Делает использвание contextBridge и API доступными
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(__dirname + "/index.html");

  mainWindow.webContents.once('did-finish-load', () => {
    const files = getFilesInCurrentDirectory();
    mainWindow.webContents.send("files", files);
  });
  // Отправка списка файлов в окно приложения
  //webContents: Это свойство главного окна, которое предоставляет доступ к контенту (содержимому) окна.
  //const files = getFilesInCurrentDirectory();
  //console.log(files);
  //mainWindow.webContents.send("files", files); //Отправляем событие "files" со всеми названиями файлов которые получили
});

function getFilesInCurrentDirectory() {
  const currentDirectory = __dirname;
  return fs.readdirSync(currentDirectory);
}
