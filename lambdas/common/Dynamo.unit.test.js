const Dynamo = require("./Dynamo");
const { describe, test, expect } = require("@jest/globals");

describe("Dynamo Test Suite", () => {
    test("Dynamo is an object", () => {
        expect(typeof Dynamo).toBe("object");
    });

    test("dynamo has get and write", () => {
        expect(typeof Dynamo.get).toBe("function");
        expect(typeof Dynamo.write).toBe("function");
    });

    const validTableName = "stag";
    const data = { ID: "3.com", shop: "3.com" };

    test("Dynamo write works", async () => {
        expect.assertions(1);
        try {
            const res = await Dynamo.write(data, validTableName);
            expect(res).toBe(data);
        } catch (error) {
            console.error("Error in dynamo write test", error);
        }
    });

    test("dynamo get works", async () => {
        expect.assertions(1);
        try {
            const res = await Dynamo.get(data.ID, validTableName);
            expect(res).toEqual(data);
        } catch (error) {
            console.log("error in dynamo get", error);
        }
    });
});
