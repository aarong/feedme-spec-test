const getValidator = require("../getvalidator");

let validate;

beforeEach(async function () {
  validate = await getValidator("feed-md5");
});

describe("The feed-md5 schema", () => {
  describe("should reject", () => {
    it("bad type", () => {
      const result = validate(123);
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be string");
    });

    it("too short", () => {
      const result = validate("01234567890123456789012");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must NOT have fewer than 24 characters"
      );
    });

    it("too long", () => {
      const result = validate("0123456789012345678901234");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must NOT have more than 24 characters"
      );
    });
  });

  describe("should accept", () => {
    it("valid string", () => {
      const result = validate("012345678901234567890123");
      expect(result).toBe(true);
    });
  });
});
