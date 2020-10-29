module.exports = {
    tables: [
        {
            //     KeySchema:
            //     - AttributeName: ID
            //       KeyType: HASH
            //   BillingMode: PAY_PER_REQUEST
            TableName: process.env.tableName,
            KeySchema: [
                { AttributeName: "PK", KeyType: "HASH" },
                { AttributeName: "SK", KeyType: "RANGE" },
            ],
            AttributeDefinitions: [
                { AttributeName: "PK", AttributeType: "S" },
                { AttributeName: "SK", AttributeType: "S" },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
            BillingMode: "PAY_PER_REQUEST",
        },
        // etc
    ],
};
