/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const fse = require('fs-extra')

let folderName;
let folderNameBase;
let folderNameTasks;
let folderNameProxies;
let folderNameLogs;
let folderNameOption;
let folderNameProfiles;
let folderNameProgram;

const path = require('path');

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
folderNameOption = path.join(folderNameBase, 'options.json');
folderNameProfiles = path.join(folderNameBase, 'profiles');

async function taskApi(appapi){
    appapi.post('/api/task/create', function (req, res) {
           
    let taskNumber = parseInt(req.body[0].data.taskqnty);
    for (var i = 0; i < taskNumber; i++) {
        let id = uuidv4()

        let task = 
        {
          id:id,
          site: req.body[0].data.site,
          profile: req.body[0].data.profile,
          mode: req.body[0].data.mode,
          sku: req.body[0].data.sku,
          offerID: req.body[0].data.offerid,
          size: req.body[0].data.size,
          proxygroup: req.body[0].data.proxygroup,
          account: req.body[0].data.account,
          delay:req.body[0].data.delay,
          communityMonitor: req.body[0].data.communityMonitor
      
        }
    fs.writeFileSync(folderNameTasks+`/${req.body[0].data.site}-${req.body[0].data.sku}-${req.body[0].data.profile.split(".json")[0]}-${req.body[0].data.size}-${req.body[0].data.proxygroup}-${req.body[0].data.mode}-${id}.json`, JSON.stringify(task));
    }
       
        res.sendStatus(200);
    })

    appapi.post('/api/task/remove', function (req, res) {
   
        fs.unlink(folderNameTasks +  `/${req.query.task}`, (err) => {
          if (err) {
            res.sendStatus(400);
            return
          }
          res.sendStatus(200);
        })
    
    })

    appapi.get('/api/task/get', function (req, res) {
        let tasks = [];
        fs.readdirSync(folderNameTasks).forEach((file) => {
          if (file.substring(file.length, file.length - 5) === ".json") {
            tasks.push(file);
          }
        });
  
        res.json(tasks);
    })

    appapi.get('/api/task/removeall', function (req, res) {

        fse.emptyDirSync(folderNameTasks)
          res.sendStatus(200);
        
      
      })
}

module.exports = {taskApi}