const Responses = require("../common/API-responses");
const Dynamo = require("../common/Dynamo");

exports.handler = async (event) => {
    let response;

    if (event.pathParameters) {
        const { PK } = event.pathParameters;
        response = await Dynamo.get({ PK });
    } else {
        response = await Dynamo.scan();
    }

    if (!response) {
        return Responses._204({ message: "Failed to get shop by PK" });
    }

    return Responses._200(response);
};
