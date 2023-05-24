const axios = require('axios');
const { v4 } = require("uuid");
const https = require("https");
const { wrapper } = require('axios-cookiejar-support');
const tough = require('tough-cookie');

const delay = require('delay');
class Foots {
    constructor(arg,event,profile,site,sku,size,proxygroup) {
        this.arg = arg;
        this.event = event;
        this.profile = profile;
        this.site=site;
        this.sku=sku;
        this.size=size;
        this.proxygroup=proxygroup;
        this.SessionIDMain = ""
        this.SessionID = ""
        this.proxy = ""
        this.csrf=""
        this.prodInfo = {}

        this.cookiejar = new tough.CookieJar();
        this.Cookies = tough.Cookie
       this.req = axios.create({
          httpsAgent: new https.Agent({ keepAlive: true,  rejectUnauthorized: false, withCredentials: true}),
          proxy: this.proxy,
          jar:this.cookiejar
        })
       

        this.Working= "#e3ca29"
        this.Error="#cf4740"
        this.Success="#55d477"
   //    this.agent = new https.Agent({  
        //    rejectUnauthorized: false
       //   });
        
    }
    
        async start(){
                await this.getSession()

                }

        async updateStatus(message, color){
            this.event.reply(this.arg, {
                     message: message,
                       color:color
                })
        }

}



module.exports = {Foots}




//axios.get("https://api.namefake.com/").then(response =>{
 ///   this.event.reply(this.arg, {
////      message: response.data.name,
 ///      color:this.Success
/// })
//})