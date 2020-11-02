const read = require("../../lambdas/endpoints/read-db");
const eventGenerator = require("../utils/eventGenerator");
const validators = require("../utils/validators");
const Dynamo = require("../../lambdas/common/Dynamo");
const { describe, test, expect } = require("@jest/globals");

describe("Read DB *** Integration Tests ***", () => {
    test("It should take an PK and return an API Gateway response", async () => {
        const pathPO = { PK: "shop", SK: "1.fr" };
        const event = eventGenerator({ pathParametersObject: pathPO });
        const res = await read.handler(event);
        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    });

    test("it should return 400 if we don't pass an PK", async () => {
        const event = eventGenerator({});
        const res = await read.handler(event);
        expect(res.statusCode).toBe(400);
    });

    test("it should return 200 if we pass only PK", async () => {
        const pathPO = { PK: "shop" };
        const event = eventGenerator({ pathParametersObject: pathPO });
        const res = await read.handler(event);
        expect(res.statusCode).toBe(200);
    });

    // test("it should return 204 if it is an incorrect PK", async () => {
    //     const event = eventGenerator({
    //         pathParametersObject: {
    //             PK: "9.com",
    //         },
    //     });
    //     const res = await read.handler(event);

    //     expect(res.statusCode).toBe(204);
    // });

    test("It should returns 200 and the data when PK and SK are valid", async () => {
        const pathPO = { PK: "shop", SK: "1.fr" };
        const body = {
            accessToke: "random",
        };
        const eventPar = {
            pathParametersObject: pathPO,
            body: body,
        };
        await Dynamo.write(pathPO.PK, pathPO.SK, body);
        const event = eventGenerator(eventPar);
        const res = await read.handler(event);
        const bodyRes = JSON.parse(res.body)[0];

        expect(res.statusCode).toBe(200);
        expect(bodyRes.accessToke).toBe(body.accessToke);
    });
});
