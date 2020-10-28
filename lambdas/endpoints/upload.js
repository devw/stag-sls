const Responses = require("../common/API-Responses");
const S3 = require("../common/S3");
const { bucketName } = process.env;

exports.handler = async (event) => {
    const { fName, data } = JSON.parse(event.body);

    if (!fName) {
        return Responses._400({
            message: `Missing fName key from: ${JSON.stringify(event)} `,
        });
    }

    const newData = await S3.write(fName, data, bucketName).catch((err) => {
        console.error("Error in S3 write", err);
        return null;
    });

    if (!newData) {
        return Responses._400({ message: `Failed to write data on ${fName}` });
    }

    return Responses._200({ newData });
};
