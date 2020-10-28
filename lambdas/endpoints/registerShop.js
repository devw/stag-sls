const Responses = require("../common/API-responses");
const Dynamo = require("../common/Dynamo");
const { tableName } = process.env;

exports.handler = async (event) => {
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: "missing id from the path" });
    }

    const ID = event.pathParameters.ID;
    const shop = JSON.parse(event.body);
    shop.ID = ID;

    const newShop = await Dynamo.write(shop, tableName).catch((err) => {
        console.error("Error in DynamoDB write ", err);
        return null;
    });

    if (!shop) {
        return Responses._400({ message: "failed to write shop by Id" });
    }

    return Responses._200({ newShop });
};
