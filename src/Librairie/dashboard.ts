const express = require("express");
const dashboard = express();
const path = require("path");
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

const Logger = require("../Librairie/logger");

module.exports = (client: any) => {

    const dashboardDirectory = path.resolve(`${process.cwd()}${path.sep}dashboard`)

    const templatesDirectory = path.resolve(`${dashboardDirectory}${path.sep}templates`)

    dashboard.use("/public", express.static(path.resolve(`${dashboardDirectory}${path.sep}public`)))

    passport.serializeUser((user: any, done: any) => {
        done(null, user);
    })

    passport.deserializeUser((obj: any, done: any) => {
        done(null, obj)
    })


    passport.use(new Strategy({
            clientID: process.env.CLIENTID,
            clientSecret: process.env.OUATHSECRET,
            callbackURL: process.env.CALLBACKURL,
            scope: ["identify", "guilds"]
        },
        (accessToken: any, refreshToken: any, profile: any, done: any) => {
            process.nextTick(() => done (null, profile))
        }
    ))

    dashboard.use(session({
        store: new MemoryStore({ checkPeriode: 99999999 }),
        secret: process.env.SSECRET,
        resave: false,
        saveUninitialized: false,
    }))

    dashboard.use(passport.initialize());
    dashboard.use(passport.session());

    dashboard.engine("html", require("ejs").renderFile)
    dashboard.set("view engine", "html")

    const renderTemplate = (res: any, req: any, template: any, data = {}) =>  {
        const baseData = {
            bot: client,
            path: req.path,
            user: req.isAuthenticated() ?  req.user: null
        };
        res.render(
            path.resolve(`${templatesDirectory}${path.sep}${template}`),
            Object.assign(baseData, data)
        )
    }

    dashboard.get("/login", (req: any, res: any, next: any) => {
            req.session.backURL = "/"
            next();
        },
        passport.authenticate("discord"));

    dashboard.get("/callback", passport.authenticate("discord"), (req: any, res: any) => {
        res.redirect("/");
        Logger.dashboard("User login on the dashboard")
    });

    dashboard.get("/", (req: any, res: any) => {
        const members = client.users.cache.size
        const channels = client.channels.cache.size
        const guilds = client.guilds.cache.size
        renderTemplate(res, req, "home.ejs", {
            stats: {
                serveurs: guilds,
                utilisateurs : members,
                salons: channels
            }
        })
    })

    dashboard.get('/logout', (req: any, res: any, next: any) => {
        req.logout(function(err: any) {
            if (err) { return next(err); }
            res.redirect('/');
            Logger.dashboard("User logout on the dashboard")
        });
    });

    client.site = dashboard.listen(process.env.PORT);
    Logger.client(`Dashboard on: http://${process.env.DOMAIN}:${process.env.PORT}`)


}