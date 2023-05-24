/* eslint-disable no-unused-vars */

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');

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

 async function settingsApi(appapi){

    appapi.get('/api/settings/get', function (req, res) {
        const data = fs.readFileSync(folderNameOption, 'utf8')
        res.send(data);
  
      })
      
      appapi.get('/api/settings/get/userData', function (req, res) {
        const data = fs.readFileSync(folderNameOption, 'utf8')
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer pk_gj8MvXcFv5Q2Wbs6HNdYhQKeWlpbw9lD`
          }
        };
        
        fetch(`https://api.hyper.co/v6/licenses/${JSON.parse(data).key}`, options)
          .then(response => response.json().then(data =>{
            res.send(data)
          }))
          .catch(err => console.error(err));
         
  
      })
//GFNF-BGEO-XP8L-CGV3-QU1O
      appapi.post('/api/settings/update', function (req, res) {
console.log(req.query.webhook)
   const data = fs.readFileSync(folderNameOption, 'utf8')
   fs.writeFile(folderNameOption, `{"key": "${JSON.parse(data).key}","user": "${JSON.parse(data).user}","discordWebhook": "${req.query.webhook}","captcha":"${req.query.captcha}"}`,
   function (err) {
    if (err) {
     res.send(err) 
    }else{
        res.sendStatus(200)
    }

  }
   )
      

 })

 appapi.post('/api/settings/updatekey', function (req, res) {
  console.log(req.query.key)
     const data = fs.readFileSync(folderNameOption, 'utf8')
     fs.writeFile(folderNameOption, `{"key": "${req.query.key}","user": "${JSON.parse(data).user}","discordWebhook": "${JSON.parse(data).discordWebhook}","captcha":"${JSON.parse(data).captcha}"}`,
     function (err) {
      if (err) {
       res.send(err) 
      }else{
          res.sendStatus(200)
      }
  
    }
     )
        
  
   })


}

 module.exports = {settingsApi}