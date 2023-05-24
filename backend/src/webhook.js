
const axios = require('axios')
const fs = require('fs');
const fetch = require('node-fetch')

let publicWebhook = "https://discord.com/api/webhooks/905525797941559347/YYxP9kcpegY3inUY4GkdM-_X1GQIDW1qXeuhy7cIFaW5PRBI-5P8TlZnQdtWuMIwD3X4"

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


async function successPublic(itemSKU,site,mode){
    fetch(publicWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "content": null,
            "content": null,
            username: "GFNF AIO",
            avatar_url: "https://cdn.discordapp.com/avatars/905525797941559347/e5664255502bcaa0e725c23febd49dee.png",
            "embeds": [
              {
                "timestamp": new Date(),
                "title": "SMOKED AMAZON 😤",
                "url": `https://www.amazon.com/dp/${itemSKU}`,
                "color": 5814783,
                "fields": [
                  {
                    "name": "Site",
                    "value": `${site}`,
                    "inline": true
                  },
                  {
                    "name": "Mode",
                    "value": `${mode}`,
                    "inline": true
                  },
                  {
                    "name": "ASIN ",
                    "value": `${itemSKU} :eggplant: `,
                 
                  },
                ],
                "footer": {
                  "text": "GFNF AIO by Omni",
                  "icon_url": "https://cdn.discordapp.com/avatars/905525797941559347/e5664255502bcaa0e725c23febd49dee.png"
                }
              }
            ]

        })
    }).then((response) => {
        console.log(response.status)
    }).catch((error) =>{
        console.log(error)
    })


}

async function declinePublic(itemSKU,site,mode){
    fetch(publicWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "content": null,
            username: "GFNF AIO",
            avatar_url: "https://cdn.discordapp.com/avatars/905525797941559347/e5664255502bcaa0e725c23febd49dee.png",
       
            "embeds": [
              {
                "title":"amazon smoked you 💀 🤣",
                "color": 12527656,
                timestamp: new Date().toISOString(),
                "fields": [
                    {
                        "name": "Site",
                        "value": `${site}`,
                        "inline": true
                      },
                      {
                        "name": "Mode",
                        "value": `${mode}`,
                        "inline": true
                      },
                      {
                        "name": "ASIN",
                        "value": `${itemSKU}`
                      },
                      {
                        name: "Need to cancel your order?",
                        value: "OH WAIT YOU CAN'T LMFAOO BROKE MF :skull: :skull:"
                      }
                ],
                "footer": {
                  "text": "GFNF AIO by Omni",
                  "icon_url": "https://cdn.discordapp.com/avatars/905525797941559347/e5664255502bcaa0e725c23febd49dee.png"
                }
              }
            ]

        })
    }).then((response) => {
        console.log(response.status)
    }).catch((error) =>{
        console.log(error)
    })


}
async function successPrivate(itemSKU,site,mode,email,proxygroup){
  const data = fs.readFileSync(folderNameOption, 'utf8')
  let JSOssN = JSON.parse(data) 

    fetch(JSOssN.discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "content": null,
            username: "GFNF AIO",
            avatar_url: "https://cdn.discordapp.com/avatars/905525797941559347/e5664255502bcaa0e725c23febd49dee.png",
            "embeds": [
              {
                "title": "SMOKED AMAZON 😤",
                "url": `https://www.amazon.com/dp/${itemSKU}`,
                "color": 5814783,
                "fields": [
                  {
                    "name": "Site",
                    "value": `${site}`,
                    "inline": true
                  },
                  {
                    "name": "Mode",
                    "value": `${mode}`,
                    "inline": true
                  },
                  {
                    "name": "Account Email",
                    "value": `||${email}||`,
                  },
                  {
                    "name": "ASIN",
                    "value": `${itemSKU}`,
                    "inline": true

                  },
                ],
                "footer": {
                  "text": "GFNF AIO by Omni",
                  "icon_url": "https://cdn.discordapp.com/avatars/905525797941559347/e5664255502bcaa0e725c23febd49dee.png"
                }
              }
            ]

        })
    }).then((response) => {
        console.log(response.status)
    }).catch((error) =>{
        console.log(error)
    })


}

async function declinePrivate(itemSKU,site,mode, email){
  const data = fs.readFileSync(folderNameOption, 'utf8')
  let JSOssN = JSON.parse(data) 

    fetch(JSOssN.discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "content": null,
            "content": null,
            username: "GFNF AIO",
            avatar_url: "https://cdn.discordapp.com/avatars/905525797941559347/e5664255502bcaa0e725c23febd49dee.png",
            "embeds": [
              {
                "title":"amazon smoked you :skull: :rofl:",
                "color": 12527656,
                timestamp: new Date().toISOString(),
                "fields": [
                    {
                        "name": "Site",
                        "value": `${site}`,
                        "inline": true
                      },
                      {
                        "name": "Mode",
                        "value": `${mode}`,
                        "inline": true
                      },
                      {
                        "name": "ASIN",
                        "value": `${itemSKU}`
                      },
                      {
                        "name": "Account Email",
                        "value": `||${email}}||`
                      },
                      {
                        name: "Need to cancel your order?",
                        value: "OH WAIT YOU CAN'T LMFAOO BROKE MF :skull: :skull:"
                      }
                ],
                "footer": {
                  "text": "GFNF AIO by Omni",
                  "icon_url": "https://cdn.discordapp.com/avatars/905525797941559347/e5664255502bcaa0e725c23febd49dee.png"
                }
              }
            ]

        })
    }).then((response) => {
        console.log(response.status)
    }).catch((error) =>{
        console.log(error)
    })
}
module.exports = {successPublic,declinePublic,declinePrivate,successPrivate}
