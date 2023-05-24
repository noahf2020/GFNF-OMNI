const express = require('express');
const appapi = express();
const cors = require('cors');
const fs = require('fs');
const RPC = require("discord-rpc");
const bodyParser = require("body-parser");
const compression = require('compression')
const profileapi = require('./api/profiles')
const settingsapi = require('./api/settings')
const proxyApi = require('./api/proxies')
const taskApi = require('./api/tasks')
const monitorApi = require('./api/monitor')

const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const axios = require('axios')
const foot = require('./src/footsite.js')

const uuid = require('uuid-v4');

let folderName;
let folderNameBase;
let folderNameTasks;
let folderNameProxies;
let folderNameLogs;
let folderNameOption;
let folderNameProfiles;
let folderNameProgram;
let folderNameAnalytics;

const path = require('path');
const Amazon = require('./src/amazon');
const AmazonMonitor = require('./src/monitor/monitor')

let userDataPath;

if(process.env.APPDATA){
  userDataPath = process.env.APPDATA
}else{
  userDataPath = process.env.HOME +'/Library' 
}


const folderPath = path.join(userDataPath, 'GFNF-AIO');

if (!fs.existsSync(folderPath))
  fs.mkdirSync(folderPath);

folderNameProgram = folderPath;
folderName = folderPath;
folderNameBase = path.join(folderPath, 'settings')
folderNameTasks = path.join(folderNameBase, 'tasks');
folderNameProxies = path.join(folderNameBase, 'proxies');
folderNameLogs = path.join(folderNameBase, 'logs');
folderNameAnalytics = path.join(folderNameBase, 'analytics.json');

folderNameOption = path.join(folderNameBase, 'options.json');
folderNameProfiles = path.join(folderNameBase, 'profiles');


async function startListen() {
  ipcMain.on('startTask', (event, arg) => {
    console.log("Task Received From Back End: " + arg)

    let reqData = arg.split("-")[5]
    console.log(reqData)
    event.reply(arg, {
      message: "Starting",
      color: '#e3ca29'
    })
    let taskHolder = {};
    if (reqData == "Turbo" || reqData == "Safe" ) {
      const fileData = JSON.parse(fs.readFileSync(folderNameTasks + "/" + arg, 'utf-8'))
      let prof = fs.readFileSync(folderNameProfiles + "/" + fileData.profile, 'utf-8');
      let profile = prof;
      let id = fileData.id;
      let site = "amazon";
      let sku = fileData.sku;
      let offerID = fileData.offerID
      let size = fileData.size;
      let account = fileData.account.split(':');
      let mode = fileData.mode;
     taskHolder[id] = new Amazon(
        arg,
        event,
        uuid(),
        mode, 
        {
          email: account[0],
          password: account[1],
        },
        sku,
        offerID,
         {
          error: 4500,
          monitor: 2000,
        },
      )
      taskHolder[id].flow();

    }else{

      const fileData = JSON.parse(fs.readFileSync(folderNameTasks + "/" + arg, 'utf-8'))
      let prof = fs.readFileSync(folderNameProfiles + "/" + fileData.profile, 'utf-8');
      let profile = prof;
      let id = fileData.id;
      let site = "amazon";
      let sku = fileData.sku;
      let offerID = fileData.offerID
      let size = fileData.size;
      let account = fileData.account.split(':');
      let mode = fileData.mode;
      let MonitorDelay = fileData.delay
      let proxygroup = fileData.proxygroup
      let communityMonitor = fileData.communityMonitor
  
      taskHolder[id] = new AmazonMonitor(
        arg,
        event,
        uuid(),
        mode, 
        {
          email: account[0],
          password: account[1],
        },
        sku,
        offerID,
         {
          error: 4500,
          monitor: MonitorDelay,
        },
        proxygroup,
        communityMonitor
      )
      taskHolder[id].start();


    }

  })
}


async function backEndInit() {

  // const DiscordRPC = require("discord-auto-rpc");

  // const client = new DiscordRPC.AutoClient({ transport: "ipc" }); // Reconnection only available on IPC transport

  //const DiscordRPC = require('discord-rpc-status');

  //DiscordRPC.startRPCClient("755162925907443843", "Twitter", "https://youtube.com", "GFNF AIO by Omni", "logo", "Gfnf AIO by Omni")

const rpc = new RPC.Client({
    transport: "ipc",
  });
 rpc.on("ready", () => {
    rpc.setActivity({
     state: `Beta v1`,
    details: `GFNF AIO by Omni`,
     startTimestamp: new Date(),
    largeImageKey: "logo",
  
 });   });
try {
   rpc.login({
     clientId: "755162925907443843",
   //"778768270278787103",
     });
    } catch (error) {
    console.error("");
}
  api()
  initFileSystem()
  startListen()
}

async function initFileSystem() {
  try {
    if (!fs.existsSync(folderNameProgram)) {
      fs.mkdirSync(folderNameProgram)
    }
  } catch (err) {
    console.error("Error: FileSystem Fail")
    console.log(err)
  }
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName)
    }
  } catch (err) {
    console.error("Error: FileSystem Fail")
    console.log(err)
  }
  try {
    if (!fs.existsSync(folderNameBase)) {
      fs.mkdirSync(folderNameBase)
    }
  } catch (err) {
    console.error("Error: FileSystem Fail")
    console.log(err)
  }
  try {
    if (!fs.existsSync(folderNameTasks)) {
      fs.mkdirSync(folderNameTasks)
    }
  } catch (err) {
    console.error("Error: FileSystem Fail")
    console.log(err)
  }
  try {
    if (!fs.existsSync(folderNameProxies)) {
      fs.mkdirSync(folderNameProxies)
    }
  } catch (err) {
    console.error("Error: FileSystem Fail")
    console.log(err)
  }
  try {
    if (!fs.existsSync(folderNameOption)) {
      fs.writeFile(folderNameOption, `{"key": "","user": "","discordWebhook": "","captcha":""}`,
        function(err) {
          if (err) return console.log(err)
        })
    }
  } catch (err) {
    console.error("Error: FileSystem Fail")
    console.log(err)
  }
  try {
    if (!fs.existsSync(folderNameAnalytics)) {
      fs.writeFile(folderNameAnalytics, ``,
      function(err) {
        if (err) return console.log(err)
      })
    }
  } catch (err) {
    console.error("Error: FileSystem Fail")
    console.log(err)
  }

  try {
    if (!fs.existsSync(folderNameProfiles)) {
      fs.mkdirSync(folderNameProfiles)
    }
  } catch (err) {
    console.error("Error: FileSystem Fail")
    console.log(err)
  }

}


async function api() {
  appapi.listen(3085)
  appapi.use(cors());
  appapi.use(express.json({
    limit: '50mb'
  }));
  appapi.use(express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
  }));
  appapi.use(compression());
  appapi.options("*", cors());
  taskApi.taskApi(appapi)
  profileapi.profileapi(appapi)
  settingsapi.settingsApi(appapi)
  proxyApi.proxyApi(appapi)
  monitorApi.monitorapi(appapi)

}



module.exports = {
  backEndInit
}