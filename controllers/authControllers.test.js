import mongoose from "mongoose";
import {app} from "../app.js"
import request from "supertest";
const { TEST_DB_HOST, PORT } = process.env;
const testData = {
    email: "test@test.com",
    password: "123456"
}
const endpoint = "/users/login"

describe("test users/login",()=>{

    let server;
    beforeAll(async()=>{
        await mongoose.connect(TEST_DB_HOST)
        server = app.listen(PORT)
    })
    afterAll(async()=>{
        mongoose.connection.close();
        server.close();
    })
    test("return status code 200", async()=>{
        const res = await request(app).post(endpoint).send(testData);
        expect(res.status).toBe(200)
    })
    test("return token",async()=>{
        const res = await request(app).post(endpoint).send(testData);
        expect(res.body.token).not.toBe("");
    })
    test("return object user with 2 fields: email and subscription with typeof string", async()=>{
        const res = await request(app).post(endpoint).send(testData);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.user).toMatchObject({
            email: expect.any(String),
            subscription: expect.any(String)
        })
    })
})