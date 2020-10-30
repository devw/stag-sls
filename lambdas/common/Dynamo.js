const AWS = require("aws-sdk");
const { dynamoEndpoint } = process.env;
let options = {};
if (process.env.IS_OFFLINE) {
    options = {
        region: "localhost",
        endpoint: dynamoEndpoint,
    };
}
if (process.env.JEST_WORKER_ID) {
    options = {
        endpoint: dynamoEndpoint,
        region: "local-env",
        sslEnabled: false,
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
                `Error fetching the data for PK of ${PK} from ${TableName}`
            );
        }
        return data.Item;
    },

    async write(PK, SK, TableName, data = {}) {
        data.PK = PK;
        data.SK = SK;

        const params = {
            TableName,
            Item: data,
        };

        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(
                `Error inserting ${JSON.stringify(data)} in table ${TableName}`
            );
        }
        return data;
    },

    query: async ({ tableName, queryPK, querySK }) => {
        const params = {
            TableName: tableName,
            KeyConditionExpression: `PK = :pk AND begins_with(SK, :sk)`,
            ExpressionAttributeValues: {
                ":pk": queryPK,
                ":sk": querySK,
            },
        };

        const res = await documentClient.query(params).promise();

        return res.Items || [];
    },
};

module.exports = Dynamo;
