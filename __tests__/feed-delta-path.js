const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("feed-delta-path");
});

describe("The feed-delta-path schema", () => {
  describe("should reject", () => {
    it("bad type", () => {
      const result = validate("INVALID");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be array");
    });

    it("bad element - type", () => {
      const result = validate([false]);
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(3);
      expect(validate.errors[0].message).toBe("must be string");
      expect(validate.errors[1].message).toBe("must be integer");
      expect(validate.errors[2].message).toBe("must match a schema in anyOf");
    });

    it("bad element - decimal number", () => {
      const result = validate([0.1]);
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(3);
      expect(validate.errors[0].message).toBe("must be string");
      expect(validate.errors[1].message).toBe("must be integer");
      expect(validate.errors[2].message).toBe("must match a schema in anyOf");
    });

    it("bad element - negative number", () => {
      const result = validate([-1]);
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(3);
      expect(validate.errors[0].message).toBe("must be string");
      expect(validate.errors[1].message).toBe("must be >= 0");
      expect(validate.errors[2].message).toBe("must match a schema in anyOf");
    });
  });

  describe("should accept", () => {
    it("valid message - empty", () => {
      const result = validate([]);
      expect(result).toBe(true);
    });

    it("valid message - string", () => {
      const result = validate(["PROP"]);
      expect(result).toBe(true);
    });

    it("valid message - integer", () => {
      const result = validate([1]);
      expect(result).toBe(true);
    });

    it("valid message - mixed", () => {
      const result = validate([1, "PROP"]);
      expect(result).toBe(true);
    });
  });
});
