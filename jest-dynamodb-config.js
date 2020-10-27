module.exports = {
    tables: [
        {
            TableName: `stag`,
            KeySchema: [{ AttributeName: "ID", KeyType: "HASH" }],
            AttributeDefinitions: [{ AttributeName: "ID", AttributeType: "S" }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
            BillingMode: "PAY_PER_REQUEST",
        },
        // etc
    ],
};
