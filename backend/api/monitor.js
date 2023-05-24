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



async function monitorapi(appapi){


let monitorStock = [
   

];


appapi.post('/api/monitor/add', function (req, res) {
//check monitorStock to see if item is there
//if item there update to new data
//else create new item data
//     ...prevState, {label: prox.split(".txt")[0], value: prox}

if(monitorStock.length = 0){

    monitorStock.forEach(item =>{
        console.log(item.product.ASIN + req.body[0].data.product.ASIN)
        if(item.product.ASIN == req.body[0].data.product.ASIN && item.product.status == req.body[0].data.product.status){
            console.log("Matching data set")
            res.sendStatus(200)

        }else{
            console.log("BOOOOM")
            monitorStock.push(req.body[0].data)
            res.sendStatus(200)
        }
     })
}else{
    monitorStock.push(req.body[0].data)
    res.sendStatus(200)
}

      
       
})



appapi.get('/api/monitor/get', function (req, res) {
            res.send(monitorStock)
    })
    setInterval(clearMonitorStock, 100000)
    async function clearMonitorStock(){
    
        monitorStock.forEach((e, i) => {
            if ((Math.abs((new Date().getTime() - e.product.time) / 1000 >= 10))) {
                // console.log('[fastify] removing token', i)
               monitorStock.splice(i, 1);
            }

        //    if ((Date.now() - e.time) / 1000 >= 120) {
                // console.log('[fastify] removing token', i)
             //   this.bank.splice(i, 1);
           // }
        });
    }

}


module.exports = {monitorapi}