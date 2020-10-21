const Responses = require("../common/API-responses");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName;

exports.handler = async (event) => {
    console.log(event, event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: "missing id from the path" });
    }

    let ID = event.pathParameters.ID;

    const user = JSON.parse(event.body);
    user.ID = ID;

    const newShop = await Dynamo.write(user, tableName).catch((err) => {
        console.log("Error in DynamoDB write ", err);
        return null;
    });

    if (!user) {
        return Responses._400({ message: "failed to write user by Id" });
    }

    return Responses._200({ newShop });
};
