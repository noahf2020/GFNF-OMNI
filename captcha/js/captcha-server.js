const express = require('express')
const app = express()
const EventEmitter = require("events");

class CaptchaServer extends EventEmitter {
    constructor() {
        super();
        this.bank = [];
    }

    initServer() {
console.log("INIT SERVER")
        app.get("/bank", (request, reply) => {
            reply.send(this.bank);
            this.bank.shift();
        });
        app.get("/requestCaptcha", (request, reply) => {
            reply.send("done");
            this.emit("captchaRequested");
        });
        app.get("/status", (request, reply) => {
            reply.send("1");
        });
        (async () => {
            try {
                await app.listen(3089);
                 console.log('[fastify] listening on port 8777')
                return;
            } catch (err) {
                
                process.exit(1);
            }
        })();
    }

    setNewToken(token, site, sitekey) {
        this.bank.push({
            token: token,
            site: site,
            sitekey: sitekey,
            time: Date.now(),
        });
        return this.bank;
    }

    clearExpiredTokens() {
        if (!this.bank) return;
        this.bank.forEach((e, i) => {
            if ((Date.now() - e.time) / 1000 >= 120) {
                // console.log('[fastify] removing token', i)
                this.bank.splice(i, 1);
            }
        });
    }
}
module.exports = CaptchaServer;
