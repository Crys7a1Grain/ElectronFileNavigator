const { contextBridge, ipcRenderer } = require('electron');

//contextBridge - безопасная связь между main process и renderer process
//exposeInMainWorld: main -> renderer. "Выставляет наружу" объекты и функции главного процесса для рендера.
contextBridge.exposeInMainWorld('api', {
  //renderer -> main 
  send: (channel, data) => {
      ipcRenderer.send(channel, data);
  },
  //main -> renderer
  receive: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
  }
});