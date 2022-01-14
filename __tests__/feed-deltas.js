const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("feed-deltas");
});

describe("The feed-deltas schema", () => {
  describe("should reject", () => {
    it("bad type", () => {
      const result = validate("INVALID");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be array");
    });

    it("bad element", () => {
      const result = validate([false]);
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(15);
      // error.message is checked in $ref schema
    });
  });

  describe("should accept", () => {
    it("valid delta - empty", () => {
      const result = validate([]);
      expect(result).toBe(true);
    });

    it("valid delta - non-empty", () => {
      const result = validate([{ Operation: "Delete", Path: [] }]);
      expect(result).toBe(true);
    });
  });
});
