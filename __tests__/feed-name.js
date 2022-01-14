const getValidator = require("../getvalidator");

let validate;

beforeEach(async function () {
  validate = await getValidator("feed-name");
});

describe("The feed-name schema", () => {
  describe("should reject", () => {
    it("bad type", () => {
      const result = validate(123);
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be string");
    });
  });

  describe("should accept", () => {
    it("empty string", () => {
      const result = validate("");
      expect(result).toBe(true);
    });

    it("non-empty string", () => {
      const result = validate("FeedName");
      expect(result).toBe(true);
    });
  });
});
