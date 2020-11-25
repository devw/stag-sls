const Responses = require("../common/API-responses");
const Dynamo = require("../common/Dynamo");

exports.handler = async (event) => {
    let response;

    const { PK } = event.pathParameters;
    response = await Dynamo.delete(PK);

    if (!response) return Responses._204("Failed to delete shop by PK");

    return Responses._200(response);
};
