const { ipcRenderer, contextBridge } = require("electron");
const electron = require('electron')
const remote = electron.remote
contextBridge.exposeInMainWorld(
  'electron',
  {
   // closeApp: (content) => ipcRenderer.send('closeApp', content),
   receive: (channel, func) => {
    let validChannels = [channel];
    if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender` 
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
},
    send: (channel, data) => {
        // whitelist channels
        let validChannels = [channel];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },

  }
)


