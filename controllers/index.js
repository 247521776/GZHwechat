/**
 * Created by boom on 2017/8/9.
 */
const router      = require("express").Router();
const fs          = require("fs");
const join        = require("path").join;
const controllers = __dirname;

fs.readdirSync(controllers)
    .filter(controllerPath => ~controllerPath.search(/^[^\.].*\.js$/))
    .forEach((controllerPath) => {
        if (controllerPath !== "index.js") {
            const controller = require(join(__dirname, controllerPath));
            for (let url in controller) {
                const methods = controller[url];
                for (let method in methods) {
                    router[method](url, methods[method]);
                }
            }
        }
    });

module.exports = (app) => {
    app.use(router);
};