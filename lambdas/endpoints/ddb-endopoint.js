const Responses = require("../common/API-responses");
const Dynamo = require("../common/Dynamo");

const readItem = async (event) => {
    const { PK } = event.path;
    const response = await Dynamo.get({ PK });
    return response ? Responses._200(response) : Responses._500(response);
};

const addItem = async (event) => {
    const { PK } = event.path;
    const response = await Dynamo.write(PK, event.body);
    return Responses._200(response);
};

const updateItem = async (event) => {
    console.log("event.pathParameters", event.path);
    const { PK } = event.path;
    const { paramName, paramValue } = event.body;
    const response = await Dynamo.update(PK, paramName, paramValue);
    return Responses._200(response);
};

const deleteItem = async (event) => {
    const { PK } = event.path;
    const response = await Dynamo.delete(PK);
    return Responses._200(response);
};

module.exports.handler = async (event) => {
    console.log("module.exports.handler", event.method);
    return {
        GET: async (e) => await readItem(e),
        POST: async (e) => await addItem(e),
        PUT: async (e) => updateItem(e),
        DELETE: async (e) => deleteItem(e),
    }[event.method](event);
};
