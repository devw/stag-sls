const write = require("../../lambdas/endpoints/write-db");
const eventGenerator = require("../utils/eventGenerator");
const validators = require("../utils/validators");
const { describe, test, expect } = require("@jest/globals");

describe("Write-DB *** Integration Test ***", () => {
    test("It should take a body and return an API Gateway response", async () => {
        const event = eventGenerator({
            body: {
                accessToke: "asdasa"
            },
            pathParametersObject: {
                PK: "shop",
                SK: "1.fr"
            },
        });

        const res = await write.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    });

    test("It should return a 200 with the shop if the shop is valid", async () => {
        const event = eventGenerator({
            body: {
                accessToke: "random",
            },
            pathParametersObject: {
                PK: "shop",
                SK: "1.fr"
            },
        });
        const res = await write.handler(event);

        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body).toEqual({
            data: {
                PK: "shop",
                SK: "1.fr",
                accessToke: "random",
            },
        });
    });
});
