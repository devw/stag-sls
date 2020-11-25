const { describe, test, expect, beforeAll } = require("@jest/globals");
const fetch = require("node-fetch");
require("dotenv").config();

describe("Reading-DB *** Integration Test ***", () => {
    beforeAll(async () => {
        this.body = { a: 1, b: 2 };
        this.fName = "test.json";
        this.ddbPK = "shop.com";
    });
    test("It should write an item on DDB", async () => {
        const { AWS_EP } = process.env;
        const promise = await fetch(`${AWS_EP}/dev/ddb/${this.ddbPK}`, {
            method: "POST",
            body: JSON.stringify(this.body),
        });
        const response = await promise.json();
        expect(response.message).toMatchObject({});
    });
    test("It should get a list of items from DDB", async () => {
        const { AWS_EP } = process.env;
        const promise = await fetch(`${AWS_EP}/dev/ddb`);
        const response = await promise.json();
        expect(response.length).toBeGreaterThan(-1);
    });
    test("It should get an item from DDB", async () => {
        const { AWS_EP } = process.env;
        const promise = await fetch(`${AWS_EP}/dev/ddb/${this.ddbPK}`);
        const response = await promise.json();
        expect(response).toMatchObject(this.body);
    });
    test("It should delete an entry from DDB", async () => {
        const { AWS_EP } = process.env;
        const promise = await fetch(`${AWS_EP}/dev/ddb/${this.ddbPK}`, {
            method: "DELETE",
        });
        const response = await promise.json();
        expect(response).toMatchObject({});
    });
    test("It should write a file on S3", async () => {
        const { AWS_EP } = process.env;
        const promise = await fetch(`${AWS_EP}/dev/s3/${this.fName}`, {
            method: "POST",
            body: JSON.stringify(this.body),
        });
        const response = await promise.json();
        expect(response.ETag).toBeDefined();
    });
    test("It should read a file from S3", async () => {
        const { AWS_EP } = process.env;
        const promise = await fetch(`${AWS_EP}/dev/s3/${this.fName}`);
        const response = await promise.json();
        expect(response).toMatchObject(this.body);
    });
});

describe("Writing configuration file in json format", () => {
    beforeAll(async () => {});
    test("It should get and write the configuration file into S3", async () => {
        const shopName = "stag01.myshopify.com";

        const getConfig = async () => {
            const { GIT_EP } = process.env;
            const promise = await fetch(`${GIT_EP}`);
            return await promise.json();
        };

        const writeConfig = async (_shopName) => {
            const config = await getConfig();

            const { AWS_EP } = process.env;
            const promise = await fetch(`${AWS_EP}/dev/s3/${_shopName}`, {
                method: "POST",
                body: JSON.stringify(config),
            });
            return await promise.json();
        };

        await writeConfig(shopName);
        const { AWS_EP } = process.env;
        const promise = await fetch(`${AWS_EP}/dev/s3/${shopName}`);
        const response = await promise.json();

        expect(response.style).toBeDefined();
        expect(response.text).toBeDefined();
    });
});
