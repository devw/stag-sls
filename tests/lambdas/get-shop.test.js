const getShop = require("../../lambdas/endpoints/getShop");
const eventGenerator = require("../utils/eventGenerator");
const validators = require("../utils/validators");
const Dynamo = require("../../lambdas/common/Dynamo");

describe("Get shop *** Integration Tests ***", () => {
    test("It should take an ID and return an API Gateway response", async () => {
        const event = eventGenerator({
            pathParametersObject: {
                shop: "2.com",
            },
        });

        const res = await getShop.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    });

    // test("it should return 400 if we don't pass an ID", async () => {
    //     const event = eventGenerator({ pathParametersObject: {} });
    //     const res = await getShop.handler(event);
    //     expect(res.statusCode).toBe(400);
    // });

    // test("it should return 204 if it is an incorrect ID", async () => {
    //     const event = eventGenerator({
    //         pathParametersObject: {
    //             ID: "2.com",
    //         },
    //     });
    //     const res = await getShop.handler(event);

    //     expect(res.statusCode).toBe(204);
    // });

    // test("It should returns a 200 and the shop data when a valid ID", async () => {
    //     const ID = "2.com";

    //     const shop = {
    //         ID,
    //         shop: "2.com",
    //     };
    //     await Dynamo.write(shop, process.env.tableName);

    //     const event = eventGenerator({
    //         pathParametersObject: {
    //             ID,
    //         },
    //     });

    //     const res = await getShop.handler(event);

    //     expect(res.statusCode).toBe(200);
    //     const body = JSON.parse(res.body);
    //     expect(body).toEqual({ shop: shop });
    // });
});
