const Responses = require("../common/API-responses");
const S3 = require("../common/S3");
const { bucketName } = process.env;

const readItem = async (event) => {
    const { fName } = event.path;

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

    return Responses._200(data);
};

const addItem = async (event) => {
    const { fName } = event.path;
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

module.exports.handler = async (event) => {
    console.log("module.exports.handler", event.method);
    return {
        GET: async (e) => await readItem(e),
        POST: async (e) => await addItem(e),
    }[event.method](event);
};
