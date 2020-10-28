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

    const { tableName } = process.env;
    const data = { ID: "3.com", shop: "3.com" };

    test("Dynamo write works", async () => {
        expect.assertions(1);
        try {
            const res = await Dynamo.write(data, tableName);
            expect(res).toBe(data);
        } catch (error) {
            console.error("Error in dynamo write test", error);
        }
    });

    test("dynamo get works", async () => {
        expect.assertions(1);
        try {
            const res = await Dynamo.get(data.ID, tableName);
            expect(res).toEqual(data);
        } catch (error) {
            console.error("Error in dynamo get", error);
        }
    });
});
