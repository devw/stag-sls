const Responses = require("../common/API-responses");

exports.handler = async (event) => {
    console.log(event, event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: "missing id from the path" });
    }

    let ID = event.pathParameters.ID;

    if (data[ID]) {
        return Responses._200(data[ID]);
    }

    return Responses._400({ message: "No id in data" });
};

const data = {
    1234: { name: "asdasd asdas", age: 12, job: "asdasdsa" },
    1235: { name: "asdasd asdas", age: 12, job: "asdasdsa" },
    1236: { name: "asdasd asdas", age: 12, job: "asdasdsa" },
};
