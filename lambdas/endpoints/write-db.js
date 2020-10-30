const Responses = require("../common/API-responses");
const Dynamo = require("../common/Dynamo");
const { tableName } = process.env;

exports.handler = async (event) => {
    const { PK, SK } = event?.pathParameters;

    if (!PK && !SK)
        return Responses._400({
            message: "missing PK and/or PK from the path",
        });

    const body = JSON.parse(event.body);
    const data = await Dynamo.write(PK, SK, tableName, body).catch((err) => {
        console.error("Error in DynamoDB write ", err);
        return null;
    });

    if (!data) return Responses._400({ message: "Failed writing Dynamo" });

    return Responses._200({ data });
};
