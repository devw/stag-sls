const AWS = require("aws-sdk");

const s3Client = new AWS.S3();

const S3 = {
    async get(fileName, bucket) {
        const params = {
            Bucket: bucket,
            Key: fileName,
        };

        let data = await s3Client.getObject(params).promise();

        if (!data) {
            throw Error(`Failed to get file ${fileName}, from ${bucket}`);
        }

        console.log("asasssassa-------", data.Body.toString("utf8"));

        return JSON.parse(await data.Body.toString());
    },
    async write(fileName, body, bucket) {
        const params = {
            Bucket: bucket,
            Body: JSON.stringify(body),
            Key: fileName,
        };

        const data = await s3Client.putObject(params).promise();

        if (!data) {
            throw Error("there was an error writing the file");
        }

        return data;
    },
};

module.exports = S3;
