/**
 * Created by boom on 2017/8/14.
 */
const request = require("supertest");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("../config.json").mongodb;
const assert = require("assert");
const bodyParser   = require("body-parser");

mongoose.connect(config);

require("../models/reply");

app.use(bodyParser.urlencoded({
    extended: false
}));

const reply = require("../controllers/reply");
for (let url in reply) {
    for (let method in reply[url]) {
        app[method](url, reply[url][method]);
    }
}
describe("controller reply", function() {
    let id = "";
    it("GET /api/reply", function(done) {
        request(app)
            .get("/api/reply")
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                if (res.body.code !== 200) done(res.body.msg);
                done();
            });
    });

    it("POST /api/reply", (done) => {
        request(app)
            .post("/api/reply")
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('X-HTTP-Method-Override', 'POST')
            .send({
                keywords: "thisTest",
                content: "thisTest"
            })
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                if (res.body.code !== 200) done(res.body.msg);
                id = res.body.data._id;
                done();
            });
    });

    it("PUT /api/reply/:id", (done) => {
        const put = {
            keywords: "thisPut",
            content: "thisPut"
        };
        request(app)
            .post(`/api/reply/${id}`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('X-HTTP-Method-Override', 'POST')
            .send(put)
            .end((err, res) => {
                if (err) done(err);
                if (res.body.code !== 200) done(res.body.msg);
                done();
            });
    });

    it("DELETE /api/reply/:id", (done) => {
        request(app)
            .get(`/api/reply/${id}`)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                if (res.body.code !== 200) done(res.body.msg);
                done();
            });
    });

    it("DELETE /api/reply/:keywords", (done) => {
        request(app)
            .get("/api/reply/thisPut")
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                if (res.body.code !== 200) done(res.body.msg);
                done()
            });
    });
});

