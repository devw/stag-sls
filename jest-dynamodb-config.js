// Resolving DynamoDB setup dynamically from serverless.yml
module.exports = async () => {
    const serverless = new (require("serverless"))();
    await serverless.init();
    const service = await serverless.variables.populateService();
    const resources = service.resources.Resources;
    const tables = Object.keys(resources)
        .map((name) => resources[name])
        .filter((r) => r.Type === "AWS::DynamoDB::Table")
        .map((r) => r.Properties);
    const { tableName } = service.custom;
    const { port } = service.custom.dynamodb.start;
    process.env.tableName = tableName;
    process.env.dynamoEndpoint = `http://localhost:${port}`;

    return {
        tables,
        port: port,
    };
};
