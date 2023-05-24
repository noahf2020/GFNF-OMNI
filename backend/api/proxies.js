/* eslint-disable no-unused-vars */

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

async function proxyApi(proxyApi){



    proxyApi.post('/api/proxy/create', function (req, res) {
           fs.writeFileSync(folderNameProxies+`/${req.body[0].proxyGroupName}.txt`, req.body[0].proxies,   
           function (err) {
            if (err) {
             res.sendStatus(400) 
             console.log("ereror")
            }else{
                res.sendStatus(200)
            }
          });
          res.sendStatus(200)

    })


    proxyApi.get('/api/proxy/get', function (req, res) {
      let proxies = [];
      fs.readdirSync(folderNameProxies).forEach((file) => {
        proxies.push(file);
      });
      res.json(proxies);
    })


    proxyApi.post('/api/proxy/remove', function (req, res) {
   
      fs.unlink(folderNameProxies +  `/${req.query.Proxygroup}`, (err) => {
        if (err) {
          res.sendStatus(400);
          return
        }
        res.sendStatus(200);
      })
  
  })


  proxyApi.get('/api/proxy/get/data', function (req, res) {

    const data = fs.readFileSync(folderNameProxies+`/${req.query.Proxygroup}`, 'utf8')
    res.send(data)

})
proxyApi.get('/api/proxy/removeall', function (req, res) {

  fse.emptyDirSync(folderNameProxies)
    res.sendStatus(200);
  

})

 }


 module.exports = { proxyApi}