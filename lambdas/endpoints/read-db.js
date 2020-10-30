const Responses = require("../common/API-responses");
const Dynamo = require("../common/Dynamo");

const { tableName } = process.env;

exports.handler = async (event) => {
    const { PK, SK } = event?.pathParameters;

    if (!PK && !SK)
        return Responses._400({
            message: "missing PK and/or PK from the path",
        });

    const response = await Dynamo.query({
        tableName,
        queryPK: PK,
        querySK: SK,
    });

    if (!response) {
        return Responses._204({ message: "Failed to get shop by PK" });
    }

    return Responses._200(response);
};
