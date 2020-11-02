const AWS = require("aws-sdk");
const TableName = process.env.tableName;
let options = {};
if (process.env.IS_OFFLINE || process.env.JEST_WORKER_ID) {
    options = {
        endpoint: `http://localhost:${process.env.dynamoPort}`,
        region: "local-env",
    };
}
const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
    async get(PK, SK) {
        const params = { TableName, Key: { PK, SK } };
        const res = await documentClient.get(params).promise();
        return res?.Item ? res.Item : Error(`Error fetching data`);
    },

    async write(PK, SK, body = {}) {
        const params = { TableName, Item: { PK, SK, ...body } };
        const isOk = await documentClient.put(params).promise();
        return isOk ? isOk : Error(`Error inserting data`);
    },

    query: async ({ PK, SK }) => {
        const params = {
            TableName,
            KeyConditionExpression: `PK = :pk`,
            ExpressionAttributeValues: {
                ":pk": PK,
            },
        };
        if (SK) {
            params.KeyConditionExpression = `PK = :pk AND begins_with(SK, :sk)`;
            params.ExpressionAttributeValues[":sk"] = SK;
        }
        const res = await documentClient.query(params).promise();
        return res.Items || [];
    },
};

module.exports = Dynamo;
