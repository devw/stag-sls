const Responses = require("../common/API-responses");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName;

exports.handler = async (event) => {
    console.log(event, event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: "missing id from the path" });
    }

    let ID = event.pathParameters.ID;

    const user = await Dynamo.get(ID, tableName).catch((err) => {
        console.log("err in Dynamo get", err);
        return null;
    });

    if (!user) {
        return Responses._400({ message: "failed to get user by Id" });
    }

    return Responses._200({ user });
};
