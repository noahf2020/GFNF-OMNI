

const fs = require('fs');
const fse = require('fs-extra')
const request = require('request-promise');
const tough = require('tough-cookie');
const delay = require('delay');
const axios = require('axios');
let folderName;
let folderNameBase;
let folderNameTasks;
let folderNameProxies;
let folderNameLogs;
let folderNameOption;
let folderNameProfiles;
let folderNameProgram;

const path = require('path');
const faker = require("faker");
const parser = require('../cookies/parser.js');
const login = require('../login');

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


class AmazonMonitor {
   
}




module.exports = AmazonMonitor
