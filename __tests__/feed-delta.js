const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("feed-delta");
});

describe("The feed-delta schema", () => {
  describe("should reject", () => {
    it("matches no delta", () => {
      const result = validate("INVALID");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(15);
      expect(validate.errors[14].message).toBe("must match a schema in anyOf");
    });
  });

  describe("should accept", () => {
    it("valid Set delta", () => {
      const result = validate({
        Operation: "Set",
        Path: [],
        Value: "VALUE"
      });
      expect(result).toBe(true);
    });

    it("valid Delete delta", () => {
      const result = validate({
        Operation: "Delete",
        Path: []
      });
      expect(result).toBe(true);
    });

    it("valid DeleteValue delta", () => {
      const result = validate({
        Operation: "DeleteValue",
        Path: [],
        Value: "VALUE"
      });
      expect(result).toBe(true);
    });

    it("valid Prepend delta", () => {
      const result = validate({
        Operation: "Prepend",
        Path: [],
        Value: "VALUE"
      });
      expect(result).toBe(true);
    });

    it("valid Append delta", () => {
      const result = validate({
        Operation: "Append",
        Path: [],
        Value: "VALUE"
      });
      expect(result).toBe(true);
    });

    it("valid Increment delta", () => {
      const result = validate({
        Operation: "Increment",
        Path: [],
        Value: 1
      });
      expect(result).toBe(true);
    });

    it("valid Decrement delta", () => {
      const result = validate({
        Operation: "Decrement",
        Path: [],
        Value: 1
      });
      expect(result).toBe(true);
    });

    it("valid Toggle delta", () => {
      const result = validate({
        Operation: "Toggle",
        Path: []
      });
      expect(result).toBe(true);
    });

    it("valid InsertFirst delta", () => {
      const result = validate({
        Operation: "InsertFirst",
        Path: [],
        Value: "VALUE"
      });
      expect(result).toBe(true);
    });

    it("valid InsertLast delta", () => {
      const result = validate({
        Operation: "InsertLast",
        Path: [],
        Value: "VALUE"
      });
      expect(result).toBe(true);
    });

    it("valid InsertBefore delta", () => {
      const result = validate({
        Operation: "InsertBefore",
        Path: [],
        Value: "VALUE"
      });
      expect(result).toBe(true);
    });

    it("valid InsertAfter delta", () => {
      const result = validate({
        Operation: "InsertAfter",
        Path: [],
        Value: "VALUE"
      });
      expect(result).toBe(true);
    });

    it("valid DeleteFirst delta", () => {
      const result = validate({
        Operation: "DeleteFirst",
        Path: []
      });
      expect(result).toBe(true);
    });

    it("valid DeleteLast delta", () => {
      const result = validate({
        Operation: "DeleteLast",
        Path: []
      });
      expect(result).toBe(true);
    });
  });
});
