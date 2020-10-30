const Dynamo = require("./Dynamo");
const { describe, test, expect } = require("@jest/globals");

describe("Dynamo Test Suite *** Unit Test ***", () => {
    const { tableName } = process.env;
    const [PK, SK] = ["shop", "2.fr"];

    test("Dynamo is an object", () => {
        expect(typeof Dynamo).toBe("object");
    });

    test("dynamo has get and write", () => {
        expect(typeof Dynamo.get).toBe("function");
        expect(typeof Dynamo.write).toBe("function");
    });

    test("Dynamo write works", async () => {
        expect.assertions(2);
        try {
            const res = await Dynamo.write(PK, SK, tableName);
            expect(res.PK).toBe(PK);
            expect(res.SK).toBe(SK);
        } catch (error) {
            console.error("Error in dynamo write test", error);
        }
    });

    test("dynamo get works", async () => {
        expect.assertions(1);
        try {
            const res = await Dynamo.get(PK, SK, tableName);
            expect(res).toEqual({ PK: PK, SK: SK });
        } catch (error) {
            console.error("Error in dynamo get", error);
        }
    });
});
