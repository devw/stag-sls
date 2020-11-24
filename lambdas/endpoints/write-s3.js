const Responses = require("../common/API-Responses");
const S3 = require("../common/S3");
const { bucketName } = process.env;

exports.handler = async (event) => {
    const { fName } = event.pathParameters;
    if (!fName) return Responses._400({ message: "missing fName" });

    const { body } = event;

    const data = await S3.write(fName, body, bucketName).catch((err) => {
        console.error("Error in S3 write", err);
        return null;
    });

    if (!data) {
        return Responses._400({ message: `Failed to write data on ${fName}` });
    }

    return Responses._200(data);
};
