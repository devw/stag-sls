module.exports = {
    tables: [
        {
            //     KeySchema:
            //     - AttributeName: ID
            //       KeyType: HASH
            //   BillingMode: PAY_PER_REQUEST
            TableName: process.env.tableName,
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
