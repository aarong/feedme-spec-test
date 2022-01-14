const getValidator = require("../getvalidator");

let validate;

beforeEach(async function () {
  validate = await getValidator("feed-args");
});

describe("The feed-args schema", () => {
  describe("should reject", () => {
    it("bad type", () => {
      const result = validate("INVALID");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be object");
    });

    it("bad property type", () => {
      const result = validate({ Invalid: 123 });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be string");
    });
  });

  describe("should accept", () => {
    it("empty object", () => {
      const result = validate({});
      expect(result).toBe(true);
    });

    it("non-empty object", () => {
      const result = validate({
        Feed: "Args"
      });
      expect(result).toBe(true);
    });
  });
});
