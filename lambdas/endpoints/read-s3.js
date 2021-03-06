const Responses = require("../common/API-Responses");
const S3 = require("../common/S3");
const { bucketName } = process.env;

exports.handler = async (event) => {
    const { fName } = event.pathParameters;

    if (!fName) {
        return Responses._400(
            `Missing fName key from: ${JSON.stringify(event)} `
        );
    }

    const data = await S3.get(fName, bucketName).catch((err) => {
        console.error("Error in S3 get", err);
        return null;
    });

    if (!data) return Responses._400(`Failed to read data by ${fName}`);

    return Responses._200(JSON.parse(data));
};
