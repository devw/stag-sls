const AWS = require("aws-sdk");
const TableName = process.env.tableName;
let options = {};
if (process.env.IS_OFFLINE || process.env.JEST_WORKER_ID) {
    options.endpoint = `http://localhost:${process.env.dynamoPort}`;
    options.region = "local-env";
}
const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
    async get({ PK, SK }) {
        const params = { TableName, Key: { PK, SK } };
        const res = await documentClient.get(params).promise();
        return res?.Item ? res.Item : Error(`Error fetching data`);
    },

    async write(PK, SK, body = {}) {
        const params = { TableName, Item: { PK, SK, ...body } };
        const isOk = await documentClient.put(params).promise();
        return isOk ? isOk : Error(`Error inserting data`);
    },

    async query(PK) {
        const params = { TableName };
        params.KeyConditionExpression = `PK = :pk`;
        params.ExpressionAttributeValues = { ":pk": PK };
        const res = await documentClient.query(params).promise();
        return res.Items || [];
    },
};

module.exports = Dynamo;
