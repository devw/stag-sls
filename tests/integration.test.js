const { describe, test, expect, beforeAll } = require("@jest/globals");
const fetch = require("node-fetch");
require("dotenv").config();

describe("Reading-DB *** Integration Test ***", () => {
    beforeAll(async () => {
        this.body = { a: 1, b: 2 };
        this.fName = "test.json";
    });
    test("It should get a list of items from DDB", async () => {
        const { endpoint } = process.env;
        const promise = await fetch(`${endpoint}/dev/ddb`);
        const response = await promise.json();
        expect(response.length).toBeGreaterThan(-1);
    });
    test("It should write an item on DDB", async () => {
        const { endpoint } = process.env;
        const promise = await fetch(`${endpoint}/dev/ddb/test.com`, {
            method: "POST",
            body: JSON.stringify({}),
        });
        const response = await promise.json();
        expect(response.message).toMatchObject({});
    });
    test("It should write a file on S3", async () => {
        const { endpoint } = process.env;
        const promise = await fetch(`${endpoint}/dev/s3/${this.fName}`, {
            method: "POST",
            body: JSON.stringify(this.body),
        });
        const response = await promise.json();
        expect(response.ETag).toBeDefined();
    });
    test("It should read a file from S3", async () => {
        const { endpoint } = process.env;
        const promise = await fetch(`${endpoint}/dev/s3/${this.fName}`);
        const response = await promise.json();
        expect(response).toMatchObject(this.body);
    });
});
