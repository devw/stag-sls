const Responses = require("../common/API-responses");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName;

exports.handler = async (event) => {
    if (!event.pathParameters.shop) {
        return Responses._400({ message: "missing the shop from the path" });
    }

    const shop = event.pathParameters.shop;

    const shopData = await Dynamo.query({
        tableName,
        index: "shop-index",
        queryKey: "shop",
        queryValue: shop,
    });

    return Responses._200({ shopData });
};
