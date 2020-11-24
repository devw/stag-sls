const Responses = require("../common/API-responses");
const Dynamo = require("../common/Dynamo");

exports.handler = async (event) => {
    const { PK, SK } = event.pathParameters;
    if (!PK) return Responses._400({ message: "missing PK" });
    const response = SK
        ? await Dynamo.get({ PK, SK }) // TODO fix Dynamo.get
        : await Dynamo.query(PK);

    if (!response) {
        return Responses._204({ message: "Failed to get shop by PK" });
    }

    return Responses._200(response);
};
