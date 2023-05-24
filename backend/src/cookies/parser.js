const fs = require('fs');
const path = require('path');

let userDataPath;

if(process.env.APPDATA){
  userDataPath = process.env.APPDATA
}else{
  userDataPath = process.env.HOME +'/Library' 
}

const folderPath = path.join(userDataPath, 'AmazonCookies');
const jarPath = path.join(userDataPath, 'AmazonCookies', 'jar.json');

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
  
  if (!fs.existsSync(jarPath)) {
    fs.appendFileSync(jarPath, '{\n\n}');
  }
}

function writeAccount(email, cookies) {
  let jar = getJar();

  jar[email] = cookies;

  jar[email].lastUpdated = Date.now();

  updateJar(jar);

  return jar;
}

function removeAccount(email) {
  let jar = getJar();

  delete jar[email];

  updateJar(jar);

  return jar;
}

function readAccount(email) {
  const data = getJar();

  if (email in data) return data[email];
  else return null;
}

function getJar() {
  const data = fs.readFileSync(jarPath);
  
  const jar = JSON.parse(data);

  return jar;
}

function updateJar(data) {
  const json = JSON.stringify(data, null, 2);

  fs.writeFileSync(jarPath, json);

  return json;
}

module.exports = {
  writeAccount,
  readAccount,
  removeAccount,
}