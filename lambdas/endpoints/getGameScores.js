const Responses = require("../common/API-responses");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName;

exports.handler = async (event) => {
    if (!event.pathParameters.game) {
        return Responses._400({ message: "missing the game from the path" });
    }

    const game = event.pathParameters.game;

    const gamePlayers = await Dynamo.query({
        tableName,
        index: "game-index",
        queryKey: "game",
        queryValue: game,
    });

    return Responses._200({ gamePlayers });
};
