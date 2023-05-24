const {
  app,
  BrowserWindow,
  ipcMain,
  protocol
} = require('electron')
const path = require('path')
const backend = require('./backend/index')
const electron = require('electron')
const {autoUpdater} = require("electron-updater")
const remote = electron.remote
const url = require('url')
const CaptchaServer = require('./captcha/js/captcha-server.js')
const isDevelopment = true;
const fs = require('fs');
function createLoginWindow() {
  backend.backEndInit()

  const loging = new BrowserWindow({
    width: 520,
    height: 350,
    frame: false,
    transparent: true,
    hasShadow: false,
    thickFrame: false,
    resizable: false,
    webPreferences: {
      devtools: isDevelopment,
      preload: __dirname + '/preload.js'
    },
    icon: "public/logo.ico",
    title: "GFNF AIO by Omni",
  })

  loging.loadURL(`http://localhost:3000/login`)
    //'http://localhost:3002/login');
}


function createWindow() {
  // Create the browser window.
 
  const win = new BrowserWindow({
    width: 1100,
    //1100
    height: 650,
    frame: false,
    transparent: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js'
    },
    icon: "public/logo.ico",
    title: "GFNF AIO by Omni",
  })

  //load the index.html from a url
  if (isDevelopment)
    win.loadURL('http://localhost:3000/task');
  else
    win.loadFile(path.join(__dirname, 'public', 'index.html'));

  if (isDevelopment)
    win.webContents.openDevTools();
  // Open the DevTools.
}

app.allowRendererProcessReuse = true;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createLoginWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

function createSettingsWindow() {
  const settingWin = new BrowserWindow({
    width: 500,
    height: 200,
    frame: false,
    transparent: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js'
    },

  })
  settingWin.loadURL('http://localhost:3000/smallsettings');
}

function createCaptchaWindow() {
  const captchaWindow = new BrowserWindow({
    width: 350,
    height: 550,
    transparent: true,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },

  })
  const bank = new CaptchaServer()
 
  bank.initServer()
  initIntercept('http://www.google.com/')
  captchaWindow.loadURL('http://www.google.com/')
  ipcMain.on('googleLogin', (event) => {
    captchaWindow.loadURL('https://accounts.google.com', { userAgent: 'Chrome' })
    captchaWindow.webContents.session.webRequest.onBeforeRequest({ urls: ['https://myaccount.google.com/*'] }, (details, callback) => {
        callback( captchaWindow.loadURL('http://www.google.com/'))
 

    })
  })
  
 
 bank.on('captchaRequested', () => { renderCaptcha(captchaWindow, bank) })
 ipcMain.on('captcha', (event, token) => {
  bank.setNewToken(token,"http://www.supremenewyork.com/","6LeoeSkTAAAAAA9rkZs5oS82l69OEYjKRZAiKdaF")
})


}

ipcMain.handle('getSettings', () => {
  return `{
    "site": "http://www.supremenewyork.com/",
    "sitekey": "6LeoeSkTAAAAAA9rkZs5oS82l69OEYjKRZAiKdaF"
  }
  `
})

// add captcha to bank when recieved from ipc

//const initIntercept = function initIntercept (url) {


 // protocol.interceptBufferProtocol('http', (req, callback) => {
  ///  if (req.url === url) {
   //   fs.readFile(path.join(__dirname, '/captcha/html/captcha.html'), 'utf8', (err, html) => {
    /// if (err) throw err
    ////   callback({ mimeType: 'text/html', data: Buffer.from(html) })
   //   })
 // }})
//}

const renderCaptcha = function renderCaptcha (window, bank) {
  window.show()
  window.webContents.send('renderCaptcha')
}





ipcMain.on('closeLoginWin', (event, arg) => {
  const win = BrowserWindow.getFocusedWindow()
  createWindow()
  try{
    win.close();
  }catch{
    win.close();

  }
 

})
//closeSetWindow

ipcMain.on('closeSetWindow', (event, arg) => {
  const win = BrowserWindow.getFocusedWindow()
  win.close()
})

ipcMain.on('closeApp', (event, arg) => {
  app.quit()
})

ipcMain.on('createSettingsWindow', (event, arg) => {
  createSettingsWindow()
})



//opencapwindow


ipcMain.on('opencapwindow', (event, arg) => {
  console.log("Open Captcha")
  createCaptchaWindow()
})



/////Auto Update


ipcMain.on('checkUpdate', (event, arg) => {
  console.log(arg)
  autoUpdater.checkForUpdates()

})