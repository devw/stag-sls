const read = require("../../lambdas/endpoints/read-db");
const eventGenerator = require("../utils/eventGenerator");
const validators = require("../utils/validators");
const Dynamo = require("../../lambdas/common/Dynamo");
const { describe, test, expect } = require("@jest/globals");

describe("Read DB *** Integration Tests ***", () => {
    const pathPO = { PK: "shop", SK: "1.fr" };
    test("It should take an PK and return an API Gateway response", async () => {
        const event = eventGenerator({ pathParametersObject: pathPO });

        const res = await read.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    });

    test("it should return 400 if we don't pass an PK", async () => {
        const event = eventGenerator({ pathParametersObject: {} });
        const res = await read.handler(event);
        expect(res.statusCode).toBe(400);
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
        const [PK, SK] = ["shop", "1.fr"];
        const body = {
            accessToke: "random",
        };
        await Dynamo.write(PK, SK, process.env.tableName, body);

        const event = eventGenerator({
            pathParametersObject: pathPO,
            body: body,
        });
        const res = await read.handler(event);
        const bodyResp = JSON.parse(res.body)[0];

        expect(res.statusCode).toBe(200);
        expect(bodyResp.accessToke).toBe(body.accessToke);
    });
});
