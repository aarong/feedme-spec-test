const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("versions");
});

describe("The versions schema", () => {
  describe("should reject", () => {
    it("bad type", () => {
      const result = validate("INVALID");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be array");
    });
    
    it("empty", () => {
      const result = validate([]);
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must NOT have fewer than 1 items");
    });

    it("bad element", () => {
      const result = validate([false]);
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });
  });

  describe("should accept", () => {
    it("valid message", () => {
      const result = validate(["0.1"]);
      expect(result).toBe(true);
    });
  });
});
