const AWS = require("aws-sdk");
let options = {};
if (process.env.IS_OFFLINE || process.env.JEST_WORKER_ID) {
    options = {
        endpoint: `http://localhost:${process.env.dynamoPort}`,
        region: "local-env",
    };
}
const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
    async get(PK, SK, TableName) {
        const params = {
            TableName,
            Key: {
                PK,
                SK,
            },
        };

        const data = await documentClient.get(params).promise();

        if (!data || !data.Item) {
            throw Error(
                `Error fetching data for ${PK}/${PK} from ${TableName}`
            );
        }
        return data.Item;
    },

    async write(PK, SK, tableName, body = {}) {
        const params = {
            TableName: tableName,
            Item: {
                PK: PK,
                SK: SK,
                ...body,
            },
        };
        const isOk = await documentClient.put(params).promise();
        return isOk ? isOk : Error(`Error inserting data`);
    },

    query: async ({ tableName, queryPK, querySK }) => {
        const params = {
            TableName: tableName,
            KeyConditionExpression: `PK = :pk`,
            ExpressionAttributeValues: {
                ":pk": queryPK,
            },
        };
        if (querySK) {
            params.KeyConditionExpression = `PK = :pk AND begins_with(SK, :sk)`;
            params.ExpressionAttributeValues[":sk"] = querySK;
        }
        const res = await documentClient.query(params).promise();

        return res.Items || [];
    },
};

module.exports = Dynamo;
