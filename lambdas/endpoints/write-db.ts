const Responses = require("../common/API-responses");
const Dynamo = require("../common/Dynamo");

// interface ReqEvent {
//     pathParameters: {
//         PK: string,
//         SK: string
//     }, 
//     body: string
// }

// interface Res {
//     message: string
// }

exports.handler = async (event) => {
    const { PK, SK } = event.pathParameters;
    const { tableName } = process.env;

    if (!PK && !SK)
        return Responses._400({
            message: "missing PK and/or PK from the path",
        });

    const body = JSON.parse(event.body);
    console.log("JSON.stringify(event?.pathParameters: ", PK, SK, tableName);
    const data = await Dynamo.write(PK, SK, tableName, body).catch((err) => {
        console.error("___Error in DynamoDB write \n", PK, SK, err);
        return null;
    });

    if (!data) return Responses._400({ message: "Failed writing Dynamo" });

    return Responses._200({message: data });
};
