const Responses = require("../common/API-responses");
const Dynamo = require("../common/Dynamo");

exports.handler = async (event) => {
    let response;

    if (event.pathParameters)
        response = await Dynamo.get(event.pathParameters.PK);
    else response = await Dynamo.scan();

    if (!response) return Responses._204("Failed to get shop by PK");

    return Responses._200(response);
};
