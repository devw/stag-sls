const Responses = require("../common/API-responses");
const Dynamo = require("../common/Dynamo");

exports.handler = async (event) => {
    const { PK } = event.pathParameters;
    const body = JSON.parse(event.body);
    const paramName = body.paramName;
    const paramValue = body.paramValue;

    if (!PK) return Responses._400({ message: "missing PK" });

    const resp = await Dynamo.update(PK, paramName, paramValue).catch((err) => {
        console.error("Error in DynamoDB update \n", PK, err);
        return null;
    });

    return resp
        ? Responses._200(resp)
        : Responses._400({ message: "Failed updating Dynamo" });
};
