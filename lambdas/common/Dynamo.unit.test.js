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
        const { tableName } = process.env;
        const [PK, SK] = ["shop", "2.fr"];
        expect.assertions(1);
        try {
            const res = await Dynamo.write(PK, SK, tableName, {});
            expect(res).toBe(Object);
        } catch (err) {
            return `Error in dynamo write test, ${err}`;
        }
    });

    test("dynamo get works", async () => {
        const { tableName } = process.env;
        const [PK, SK] = ["shop", "2.fr"];
        expect.assertions(1);
        try {
            const res = await Dynamo.get(PK, SK, tableName);
            expect(res).toEqual({ PK: PK, SK: SK });
        } catch (err) {
            return `Error in dynamo read test, ${err}`;
        }
    });
});
