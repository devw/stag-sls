const Responses = require("../common/API-responses");
const Dynamo = require("../common/Dynamo");

exports.handler = async (event) => {
    const { PK, SK } = event.pathParameters;
    if (!PK && !SK)
        return Responses._400({
            message: "missing PK and/or PK from the path",
        });

    const body = JSON.parse(event.body);
    const isOK = await Dynamo.write(PK, SK, body).catch((err) => {
        console.error("Error in DynamoDB write \n", PK, SK, err);
        return null;
    });
    return isOK
        ? Responses._200({ message: isOK })
        : Responses._400({ message: "Failed writing Dynamo" });
};
