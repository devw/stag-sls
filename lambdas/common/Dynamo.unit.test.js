const Dynamo = require("./Dynamo");
const { describe, test, expect } = require("@jest/globals");

describe("Dynamo Test Suite *** Unit Test ***", () => {
    test("Dynamo is an object", () => {
        expect(typeof Dynamo).toBe("object");
    });

    test("dynamo has get and write", () => {
        expect(typeof Dynamo.get).toBe("function");
        expect(typeof Dynamo.write).toBe("function");
    });

    test("Dynamo write works", async () => {
        const [PK, SK] = ["shop", "2.fr"];
        expect.assertions(1);
        await Dynamo.write(PK, SK, {})
            .then((res) => expect(res).toBe(Object))
            .catch((err) => `Error in dynamo write test, ${err}`);
    });

    test("dynamo get works", async () => {
        const [PK, SK] = ["shop", "2.fr"];
        expect.assertions(1);
        await Dynamo.get({ PK, SK })
            .then((res) => expect(res).toEqual({ PK: PK, SK: SK }))
            .catch((err) => `Error in dynamo read test, ${err}`);
    });
});
