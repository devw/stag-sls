const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-08-10",
});

const Dynamo = {
    async get(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID,
            },
        };

        const data = await documentClient.get(params).promise();

        if (!data || !data.Item) {
            throw Error(
                `there was an error fetching the data for ID of ${ID} from ${TableName}`
            );
        }
        console.log(data);
        return data.Item;
    },
};

module.exports = Dynamo;
