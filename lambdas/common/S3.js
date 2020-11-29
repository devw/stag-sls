const AWS = require("aws-sdk");

let options = {};
if (process.env.IS_OFFLINE || process.env.JEST_WORKER_ID) {
    console.log(process.env.IS_OFFLINE, process.env.JEST_WORKER_ID);
    // options.endpoint = `http://localhost:${process.env.dynamoPort}`;
    // options.region = "local-env";
}

const s3Client = new AWS.S3(options);

const S3 = {
    async get(fileName, bucket) {
        const params = {
            Bucket: bucket,
            Key: fileName,
        };

        const res = await s3Client.getObject(params).promise();

        if (!res) throw Error(`Failed to get file ${fileName}, from ${bucket}`);

        return JSON.parse(await res.Body.toString());
    },
    async write(fileName, body, bucket) {
        const params = {
            Bucket: bucket,
            Body: JSON.stringify(body),
            Key: fileName,
        };

        const data = await s3Client.putObject(params).promise();

        if (!data) throw Error("there was an error writing the file");

        return data;
    },
};

module.exports = S3;
