const Responses = require("../common/API-responses");
const Dynamo = require("../common/Dynamo");

exports.handler = async (event) => {
    const { PK, SK } = event?.pathParameters;
    if (!PK) return Responses._400({ message: "missing PK" });
    console.log("SK ************", SK);
    const response = SK
        ? await Dynamo.query({ PK, SK }) // TODO fix Dynamo.get
        : await Dynamo.query({ PK, SK });

    if (!response) {
        return Responses._204({ message: "Failed to get shop by PK" });
    }

    return Responses._200(response);
};
