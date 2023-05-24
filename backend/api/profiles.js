
const fs = require('fs');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');


let folderName;
let folderNameBase;
let folderNameTasks;
let folderNameProxies;
let folderNameLogs;
let folderNameOption;
let folderNameProfiles;
let folderNameProgram;

let profNum = 0

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


async function profileapi(appapi){


appapi.get('/api/profile/get', function (req, res) {
      let profiles = [];
      let out = []
      fs.readdirSync(folderNameProfiles).forEach((file) => {
        if (file.substring(file.length, file.length - 5) === ".json") {
          profiles.push(file);
        }
      });

      res.json(profiles);

    })

appapi.get('/api/profile/getdigets', function (req, res) {
 
  const data = fs.readFileSync(folderNameProfiles+`/${req.query.profile}`, 'utf8')
  let parsedData = JSON.parse(data)
  res.json(parsedData.cardnum);
    })
appapi.post('/api/profile/create', function (req, res) {
              let profle = 
                  {
                    id:`${req.query.id}`,
                    profilename: `${req.query.Profile}`,
                    fullname: `${req.query.Fullname}`,
                    email: `${req.query.Email}`,
                    phonenumber: `${req.query.Phonenumber}`,
                    address1: `${req.query.Address1}`,
                    address2: `${req.query.Address2}`,
                    city: `${req.query.City}`,
                    zipcode: `${req.query.Zipcode}`,
                    state: `${req.query.State}`,
                    country: `${req.query.Country}`,
                    cardnum: `${req.query.Cardnum}`,
                    cvv: `${req.query.Cvv}`,
                    cardexpo: `${req.query.CardExpo}`,
                  }
                

      
      
              fs.writeFileSync(folderNameProfiles+`/${req.query.Profile}.json`, JSON.stringify(profle));
              res.sendStatus(200);


})
appapi.post('/api/profile/remove', function (req, res) {
   
    fs.unlink(folderNameProfiles +  `/${req.query.Profile}`, (err) => {
      if (err) {
        res.sendStatus(400);
        return
      }
      res.sendStatus(200);
    })

})

appapi.post('/api/profile/copy', function (req, res) {
        profNum ++
        const data = fs.readFileSync(folderNameProfiles+`/${req.query.Profile}`, 'utf8')
        let parsedData = JSON.parse(data)
    let newProfName = req.query.Profile.split(".json")[0]
      let profle = 
      {
        id:uuidv4(),
        profilename: `${parsedData.profilename}`,
        fullname: `${parsedData.fullname}`,
        email: `${parsedData.email}`,
        phonenumber: `${parsedData.phonenumber}`,
        address1: `${parsedData.address1}`,
        address2: `${parsedData.address2}`,
        city: `${parsedData.city}`,
        zipcode: `${parsedData.zipcode}`,
        state: `${parsedData.state}`,
        country: `${parsedData.country}`,
        cardnum: `${parsedData.cardnum}`,
        cvv: `${parsedData.cvv}`,
        cardexpo: `${parsedData.cardexpo}`,
      }

console.log(profle)
    fs.writeFileSync(folderNameProfiles+`/${newProfName}${profNum}copy.json`, JSON.stringify(profle));
    res.sendStatus(200);

  } )



}





module.exports =  {profileapi }