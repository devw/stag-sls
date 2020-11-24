const Responses = require("../common/API-responses");
const Dynamo = require("../common/Dynamo");

exports.handler = async (event) => {
    const { PK } = event.pathParameters;
    if (!PK) return Responses._400({ message: "missing PK" });

    const body = JSON.parse(event.body);
    const isOK = await Dynamo.write(PK, body).catch((err) => {
        console.error("Error in DynamoDB write \n", PK, err);
        return null;
    });
    return isOK
        ? Responses._200({ message: isOK })
        : Responses._400({ message: "Failed writing Dynamo" });
};
