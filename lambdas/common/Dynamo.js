const AWS = require("aws-sdk");
const TableName = process.env.tableName;
let options = {};
if (process.env.IS_OFFLINE || process.env.JEST_WORKER_ID) {
    options.endpoint = `http://localhost:${process.env.dynamoPort}`;
    options.region = "local-env";
}
const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
    async get({ PK }) {
        const params = { TableName, Key: { PK } };
        const res = await documentClient.get(params).promise();
        return res.Item ? res.Item : Error(`Error fetching data`);
    },

    async write(PK, body = {}) {
        const params = { TableName, Item: { PK, ...body } };
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

    async scan() {
        const r = await documentClient.scan({ TableName: TableName }).promise();
        return r.Items;
    },
};

module.exports = Dynamo;
