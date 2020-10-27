const Responses = require("./API-responses");
const { describe, test, expect } = require("@jest/globals");

describe("API Response Test Suite", () => {
    test("Response is an object", () => {
        expect(typeof Responses).toBe("object");
    });

    test("_200 works", () => {
        const res = Responses._200({ name: "antonio" });
        expect(res.statusCode).toBe(200);
        expect(typeof res.body).toBe("string");
        expect(res.headers["Content-Type"]).toBe("application/json");
    });

    test("_400 works", () => {
        const res = Responses._400({ name: "antonio" });
        expect(res.statusCode).toBe(400);
        expect(typeof res.body).toBe("string");
        expect(res.headers["Content-Type"]).toBe("application/json");
    });
});
