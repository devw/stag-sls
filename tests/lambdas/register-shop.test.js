const registerShop = require("../../lambdas/endpoints/registerShop");
const eventGenerator = require("../utils/eventGenerator");
const validators = require("../utils/validators");
const { describe, test, expect } = require("@jest/globals");

describe("Register shop integration tests", () => {
    test("it shoudl take a body and return an API Gateway response", async () => {
        const event = eventGenerator({
            body: {
                accessToke: "asdasa",
                shop: "2.com",
            },
        });

        const res = await registerShop.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    });

    test("shoudl return a 200 with the shop if the shop is valid", async () => {
        const event = eventGenerator({
            body: {
                accessToke: "asdasa",
                shop: "2.com",
            },
            pathParametersObject: {
                ID: "2.com",
            },
        });
        const res = await registerShop.handler(event);

        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body).toEqual({
            newShop: {
                ID: "2.com",
                accessToke: "asdasa",
                shop: "2.com",
            },
        });
    });
});
